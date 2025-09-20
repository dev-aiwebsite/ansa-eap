"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/serverActions/crudPosts";
import { Button } from "@/components/ui/button";
import { categories } from "@/app/demo/demoData";
import DeleteItemButton from "./deletePostBtn";

// Define the columns for the DataTable
export const PostColumns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categoryId = row.getValue<string>("category");
      return categories.find((i) => i.id == categoryId)?.label ?? categoryId;
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="space-x-2">
          <Button href={`/admin/posts/${item.id}`} size="sm" variant="outline">
            Edit
          </Button>
          <DeleteItemButton
            itemLabel="practitioner"
            itemId={item.id}
            itemName={item.title}
          />
        </div>
      );
    },
  },
];
