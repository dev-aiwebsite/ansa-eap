import CompanyForm from "@/components/forms/formCompanies";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getCompanyById } from "@/serverActions/crudCompanies";
import { ArrowLeft } from "lucide-react";

interface DynamicPageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({params}:DynamicPageProps) {
  const { id } = await params;

  // fetch data server-side
  const company = await getCompanyById(id);
    
    return (
        <Container>
            <Button href="/admin/companies" variant="ghost">
    <ArrowLeft /> Back
      </Button>
        <div className="card flex-1 overflow-auto">
            <CompanyForm company={company.data}  />
        </div>
        </Container>
    );
}
