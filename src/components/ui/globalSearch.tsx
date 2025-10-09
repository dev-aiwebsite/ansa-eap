"use client";

import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useAppServiceContext } from "@/context/appServiceContext";
import { usePostServiceContext } from "@/context/postServiceContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostItem } from "../post/postSidebar";
import { Button } from "./button";
import { useNavItems } from "../sidebar/navItems";

export function GlobalSearch() {
  const navItems = useNavItems()
  const {globalSearchOpen, setGlobalSearchOpen} = useAppServiceContext()
  const { allPosts, latestPosts, generatePostLink } = usePostServiceContext();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "f") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setGlobalSearchOpen((globalSearchOpen) => !globalSearchOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function showSearchDialog() {
    setGlobalSearchOpen(true);
  }

  const filteredPost = allPosts.filter((item) => {
    const itemString = JSON.stringify(item).toLowerCase();
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean); // split on spaces, ignore empty

    // All terms must be present in the item string
    return terms.every((term) => itemString.includes(term));
  });
  

  function handleOnSelect(slug?: string) {
    if (!slug) return;
    setGlobalSearchOpen(false);
    router.push(slug);
  }

  return (
    <>
      <Button
        className="rounded-full bg-white aspect-square !p-5 text-primary"
        size="icon"
        variant="secondary"
        onClick={showSearchDialog}
      >
        <Search />
      </Button>
      <CommandDialog
        shouldFilter={false}
        className="p-2 w-full translate-y-0 top-20"
        open={globalSearchOpen}
        onOpenChange={setGlobalSearchOpen}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={(v) => setSearch(v)}
          value={search}
        />

        <CommandList className="h-full max-h-[80vh]">
          {search ? (
            <>
              {filteredPost.length > 0 && (
                <CommandGroup heading="Posts">
                  {filteredPost.map((i, index) => {
                    return (
                      <CommandItem
                        onSelect={() => handleOnSelect(generatePostLink(i))}
                        className="!p-0 "
                        key={
                          i.id && i.category ? i.id + i.category + index : index
                        }
                      >
                        <PostItem
                          disableLink
                          className="bg-transparent w-full text-sm rounded"
                          item={i}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              <CommandEmpty>No results found.</CommandEmpty>
            </>
          ) : (
            <>
              <CommandGroup heading="Recent Posts">
                {latestPosts.length > 0 &&
                  latestPosts.map((i, index) => (
                    <CommandItem
                      className="!p-0"
                      onSelect={() => handleOnSelect(generatePostLink(i))}
                      key={
                        i.id && i.category ? i.id + i.category + index : index
                      }
                      value={`${i.title} ${i.category ?? ""}`} // 👈 searchable text
                    >
                      <PostItem
                        disableLink
                        className="bg-transparent w-full text-sm rounded"
                        item={i}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandSeparator />
              <div className="grid grid-cols-4">
                <CommandGroup
                  className="p-1.5 text-sm"
                  heading="Learning & Development"
                >
                  {navItems
                    .filter((i) => i.link == "/learning-development")[0]
                    .subitems?.map((i) => (
                      <CommandItem
                        key={i.title}
                        className="!py-1 text-xs"
                        onSelect={() => handleOnSelect(i.link)}
                      >
                        {i.title}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </div>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
