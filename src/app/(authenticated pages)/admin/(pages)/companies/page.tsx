"use client"
import { CompanyColumns } from "@/components/dataTables/companies/companyColumn";
import { DataTable } from "@/components/dataTables/dataTable";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { CompaniesWithMemberCount, useElevateAdminContext } from "@/context/ElevateAdminContext";
import { getPractitioners, Practitioner } from "@/serverActions/crudPractitioners";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const { companies } = useElevateAdminContext()
  const [practitioners, setPractitioners] = useState<Practitioner[] | null>(null)

  useEffect(() => {
    async function fetchPractitioners() {
      const { data } = await getPractitioners()
      if (data?.length) {
        setPractitioners(data)
      }
    }
    fetchPractitioners()
  }, [])

  const tableData:CompaniesWithMemberCount[] | null = companies && companies?.map(c => {
    return {
      ...c,
      "practitioners": practitioners ? practitioners.filter(p => c.practitioners.includes(p.id)).map(p => p.first_name + " " + p.last_name) : c.practitioners
    }
  })
  

  return (
    <Container className="card w-full-sidebar">
      <div className="flex flex-row">
        <h2 className="mb-5">Companies </h2>
        <Button href="/admin/companies/new" className="ml-auto">
          <PlusCircle /> Add Company
        </Button>
      </div>
      {!practitioners || !tableData ?
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-400 border-t-transparent"></div>
        </div>
        :
        <DataTable columns={CompanyColumns} data={tableData} />
      }
    </Container>
  );
};

export default Page;
