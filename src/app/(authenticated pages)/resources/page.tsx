import ContentLibraryPage from "@/components/post/contentLibraryPage";
import ContentLibraryPageMobile from "@/components/post/contentLibraryPageMobile";
import Container from "@/components/ui/container";
import { isMobileUA } from "@/lib/isMobileUa";

export default async function Page(){
  const isMobile = await isMobileUA()
  return <Container>
        {isMobile ? <ContentLibraryPageMobile/> : <ContentLibraryPage />}

    </Container>
  
  
}

