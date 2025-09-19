"use client";

import PostEditor from "@/components/forms/postEditor";


export default function Page() {

  return (
    <div className="flex gap-6 h-full">
      <div className="card flex-1 overflow-hidden">
        <div className="rounded-xl flex-1 mx-h-webkit-fill overflow-auto">
            <PostEditor />
        </div>
      </div>
      <div className="right-sidebar">

      </div>
    </div>
  );
}
