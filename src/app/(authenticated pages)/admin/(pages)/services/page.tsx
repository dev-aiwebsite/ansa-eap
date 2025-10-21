import { ServiceColumns } from "@/components/dataTables/services/serviceColumn";
import { DataTable } from "@/components/dataTables/dataTable";
import { Button } from "@/components/ui/button";
import { getServices } from "@/serverActions/crudServices";
import { PlusCircle } from "lucide-react";
import Container from "@/components/ui/container";

const Page = async () => {
  const res = await getServices();
  return (
    <Container className="card w-full-sidebar">
      <div className="flex flex-row">
        <h2 className="mb-5">Services </h2>
        <Button href="/admin/services/new" className="ml-auto">
          <PlusCircle /> Add Service
        </Button>
      </div>
      <DataTable columns={ServiceColumns} data={res.data || []} />
    </Container>
  );
};

export default Page;
