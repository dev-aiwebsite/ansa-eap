"use client"
import { PostColumns } from "@/components/post/postColumns";
import { PostDataTable } from "@/components/post/postDataTable";
import { Button } from "@/components/ui/button";
import { usePostServiceContext } from "@/context/postServiceContext";
import { PlusCircle } from "lucide-react";

const Page = () => {
    const {allPosts} = usePostServiceContext()
    return (
       <div className="card">
              <div className="flex flex-row">
                <h2 className="mb-5">Post </h2>
                <Button href="/admin/posts/new" className="ml-auto">
                  <PlusCircle /> Add Post
                </Button>
              </div>

              <div>
                <PostDataTable columns={PostColumns} data={allPosts}/>
              </div>
            </div>
    );
}

export default Page;