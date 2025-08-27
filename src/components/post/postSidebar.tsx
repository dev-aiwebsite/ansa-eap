"use client";
import { categories } from "@/app/demo/demoData";
import { usePostServiceContext } from "@/context/postServiceContext";
import Container from "../ui/container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import ImageWithFallback from "../ui/imageWithFallback";
import { Post } from "./postCard";

type PostSidebarProps = {
    currentPost: Partial<Post> | null;
    currentCategory: string;
}
const PostSidebar = ({currentPost, currentCategory}:PostSidebarProps) => {
  const { yogas, healthNewsPosts, blogs, videoContents } = usePostServiceContext();

  const latestPosts = [
    {...yogas.at(-1), category:"7p2v1Ur_O5" },
    {...healthNewsPosts.at(-1), category: "7p2v1Ur_O4"},
    {...blogs.at(-1), category: "7p2v1Ur_O6"},
    {...videoContents.at(-1), category: "7p2v1Ur_O1"}
  ];

console.log(currentPost, 'postData')
console.log(currentCategory, 'currentCategory')
  return (
    <Container className="max-w-[400px]">
      <div className="flex flex-col flex-nowrap gap-6">
        <div className="card space-y-4">
          <div className="flex flex-row gap-2 items-center">
            <Input
              className="p-5 !ring-0 !shadow-none"
              type="search"
              name="post-search"
              placeholder="Keyword"
            />
            <Button className="p-5" size={"icon"}>
              <Search size={40} />
            </Button>
          </div>
          <div>
            <h4 className="card-title mb-2">Categories</h4>
            <ul className="font-medium text-muted-foreground text-sm">
              {categories.map((i) => (
                <li key={i.id} className="capitalize">
                  <Link
                    className="hover:text-app-purple-300"
                    href={"/learning-development/" + i.label}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h4 className="card-title mb-2">Recent Posts</h4>
          <div>
            {(latestPosts.length > 0) &&
              latestPosts.map((i) => <PostItem key={i.id} item={i} />)}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PostSidebar;

function PostItem({ item }: { item: Partial<Post> & { category: string } }) {
  return (
    <Link
      className="space-x-4 rounded-xl p-2 bg-muted flex flex-row justify-between items-center"
      href="#"
    >
      <div className="h-full w-fit">
        <ImageWithFallback
          iconSize={30}
          className="object-contain w-auto !bg-gray-200 aspect-square rounded overflow-hidden"
          width={40}
          height={40}
          alt={""}
          src={item.thumbnail}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium text-muted-foreground text-sm">
          {item.title}
        </p>
        <p className="capitalize text-muted-foreground text-xs">{categories.find( i => i.id == item.category)?.label}</p>
      </div>
    </Link>
  );
}
