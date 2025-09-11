import FormPractitioner from "@/components/forms/formPractitioner";
import Container from "@/components/ui/container";
import { getPractitioners } from "@/serverActions/crudPractitioners";

const AdminPage = () => {
    getPractitioners()
    .then(res => {
        console.log(res)
    })
    return (
        
        <Container className="card">
            <FormPractitioner />
        </Container>
        
    );
}

export default AdminPage;