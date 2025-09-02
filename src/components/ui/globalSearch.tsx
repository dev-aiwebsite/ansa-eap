"use client";

import { CreditCard, Search, Settings, User } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { usePostServiceContext } from "@/context/postServiceContext";
import { useEffect, useState } from "react";
import { PostItem } from "../post/postSidebar";
import { Button } from "./button";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const {latestPosts } = usePostServiceContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function showSearchDialog() {
    setOpen(true);
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
      <CommandDialog className="w-full translate-y-0 top-20" open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList className="h-full max-h-[80vh]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent Posts">
            {latestPosts.length > 0 &&
              latestPosts.map((i,index) => (
                <CommandItem
                className="!p-0"
                key={(i.id && i.category) ? i.id + i.category + index: index}
                value={`${i.title} ${i.category ?? ""}`} // 👈 searchable text
              >
                <PostItem className="bg-transparent w-full text-xs rounded" item={i} />
              </CommandItem>
              
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
