"use client"
import { PostColumns } from "@/components/dataTables/posts/postColumns";
import { DataTable } from "@/components/dataTables/dataTable";
import { Button } from "@/components/ui/button";
import { usePostServiceContext } from "@/context/postServiceContext";
import { PlusCircle } from "lucide-react";
import Container from "@/components/ui/container";

const Page = () => {
    const {allPosts} = usePostServiceContext()
    return (
       <Container className="card w-full-sidebar">
              <div className="flex flex-row">
                <h2 className="mb-5">Post </h2>
                <Button href="/admin/posts/new" className="ml-auto">
                  <PlusCircle /> Add Post
                </Button>
              </div>
                <DataTable columns={PostColumns} data={allPosts}/>              
        </Container>
    );
}

export default Page;