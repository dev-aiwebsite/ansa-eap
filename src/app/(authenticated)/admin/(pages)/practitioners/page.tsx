import { DataTable } from "@/components/dataTables/dataTable";
import { PractitionerColumn } from "@/components/dataTables/practitioners/practitionerColumn";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getPractitioners } from "@/serverActions/crudPractitioners";
import { PlusCircle } from "lucide-react";

const Page = async () => {
    const res = await getPractitioners()
    return (
       <Container className="card w-full-sidebar">
              <div className="flex flex-row">
                <h2 className="mb-5">Practitioners </h2>
                <Button href="/admin/practitioners/new" className="ml-auto">
                  <PlusCircle /> Add Practitioner
                </Button>
              </div>
              <DataTable className="flex-1" columns={PractitionerColumn} data={res.data || []}/>
        </Container>
    );
}

export default Page;