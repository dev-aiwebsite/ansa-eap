"use client"
import CompanyForm from "@/components/forms/formCompanies";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    return (
        <Container className="flex flex-col">
            <Button variant="ghost" onClick={() => router.push("/admin/companies")}>
    <ArrowLeft /> Back
      </Button>
        <div className="card flex-1 overflow-auto">
            <CompanyForm />
        </div>
        </Container>
    );
}

export default Page;