"use client";

import { useAppServiceContext } from "@/context/appServiceContext";
import { AuthenticateUser } from "@/serverActions/login_logout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";

export default function Intro() {
    const router = useRouter()
    const {currentUser} = useAppServiceContext()
    
  return (
    <Dialog open onOpenChange={async (e)=> {
        console.log(e)
        if(!e){
            console.log('routing to dashboard')

      const credentials = {
      useremail: currentUser.email,userpass: currentUser.password
    }
    
            await AuthenticateUser(credentials)
            router.push('/dashboard')
    
        }
    }}>
      <DialogContent overlayClassName="bg-black/90" className="!max-w-[1200px] bg-transparent text-white border-none max-w-3xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">Welcome to Elevate</DialogTitle>
        </DialogHeader>
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/1128744856?h=c885f9ded0&portrait=0&byline=0&title=0&autoplay=1&badge=0&vimeo_logo=0&controls=1"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
            }}
            title="Welcome to Elevate Video"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
