"use client"
import { CompanyColumns } from "@/components/dataTables/companies/companyColumn";
import { DataTable } from "@/components/dataTables/dataTable";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useElevateAdminContext } from "@/context/ElevateAdminContext";
import { PlusCircle } from "lucide-react";

const Page = () => {
  const {companies, isFetching} = useElevateAdminContext()
  
  return (
    <Container className="card w-full-sidebar">
      <div className="flex flex-row">
        <h2 className="mb-5">Companies </h2>
        <Button href="/admin/companies/new" className="ml-auto">
          <PlusCircle /> Add Company
        </Button>
      </div>

      <DataTable columns={CompanyColumns} isLoading={isFetching} data={companies} />
    </Container>
  );
};

export default Page;
