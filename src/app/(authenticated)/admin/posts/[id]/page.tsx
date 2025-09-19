"use client"
import PostEditor from "@/components/forms/postEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
      const params = useParams(); 
    const id = params?.id as string;
    const router = useRouter()
    return (
        <>
            <Button variant="ghost" onClick={() => router.push("/admin/posts")}>
    <ArrowLeft /> Back
      </Button>
        <div className="card">
            <PostEditor postId={id} />
        </div>
        </>
    );
}

export default Page;