import { companyColumns } from "@/components/dataTables/companyColumn";
import { PostDataTable } from "@/components/post/postDataTable";
import { Button } from "@/components/ui/button";
import { getCompanies } from "@/serverActions/crudCompanies";
import { PlusCircle } from "lucide-react";

const Page = async () => {
    const companies = await getCompanies()
    return (
       <div className="card">
              <div className="flex flex-row">
                <h2 className="mb-5">Companies </h2>
                <Button href="/admin/companies/new" className="ml-auto">
                  <PlusCircle /> Add Company
                </Button>
              </div>

              <div>
                <PostDataTable columns={companyColumns} data={companies.data || []}/>
              </div>
            </div>
    );
}

export default Page;