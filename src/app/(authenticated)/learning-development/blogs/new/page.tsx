"use client";

import BlogAddNew from "@/components/forms/BlogAddNew";

export default function Page() {

  return (
    <div className="flex gap-6 h-full">
      <div className="card flex-1">
            <BlogAddNew />
      </div>
      <div className="right-sidebar">

      </div>
    </div>
  );
}
