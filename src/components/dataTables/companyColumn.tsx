"use client";

import { Company } from "@/serverActions/crudCompanies";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CopyButton } from "../ui/copyButton";
import { Button } from "../ui/button";

export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: "Company Code",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <CopyButton label={id} value={id} />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.logo_url && (
          <Image
            src={row.original.logo_url}
            alt={row.original.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "max_users",
    header: "Max Users",
  },
  {
    accessorKey: "max_booking_credits_per_user",
    header: "Max Booking Credits/User",
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => {
      const date = new Date(row.original.updated_at);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const company = row.original;
      return (
        <Button href={`/admin/companies/${company.id}`} size="sm" variant="outline">
          Edit
        </Button>
      );
    },
  },
];
