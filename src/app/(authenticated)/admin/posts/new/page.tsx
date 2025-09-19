"use client"
import PostEditor from "@/components/forms/postEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    return (
        <>
            <Button variant="ghost" onClick={() => router.push("/admin/posts")}>
    <ArrowLeft /> Back
      </Button>
        <div className="card">
            <PostEditor />
        </div>
        </>
    );
}

export default Page;