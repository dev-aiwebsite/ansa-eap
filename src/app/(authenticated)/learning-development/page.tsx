import ContentLibraryPage from "@/components/post/contentLibraryPage";
import ContentLibraryPageMobile from "@/components/post/contentLibraryPageMobile";
import { isMobileUA } from "@/lib/isMobileUa";

export default async function Page(){
  const isMobile = await isMobileUA()
  return <>
        {isMobile ? <ContentLibraryPageMobile/> : <ContentLibraryPage />}

    </>
  
  
}

