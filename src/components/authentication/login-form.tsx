"use client";
import { login } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthenticateUser } from "@/serverActions/login_logout";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import OtpVerification from "../OtpVerification";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useremail,setUserEmail] = useState("")
  const [userpass, setUserpass] = useState("")
  const [otpConfirmed, setOtpConfirmed] = useState(false)
    const router = useRouter();


  useEffect(()=>{
    if(!otpConfirmed) return

    const credentials = {
      useremail,userpass
    }
    async function login(){
      const authRes = await AuthenticateUser(credentials, false)
      router.push(authRes?.redirectUrl)
    }
    login()

  },[otpConfirmed])

  

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    const credentials = {
      useremail,userpass
    }
    

    try {
        const res = await login(credentials)
        console.log(res, 'AuthenticateUser res')
        if(!res){
          setError("Wrong credentials")
          return false
        }
        setSuccess(true)
    } catch (error) {
      const typedError = error as Error;
      setError(typedError?.message || 'Something went wrong');
      
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="md:min-h-[500px] grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white">
      <div className="bg-app-blue-600 p-5 md:p-10 items-center justify-center flex">
        <Image 
        className="max-md:w-[120px]"
        src="/assets/images/logo.png"
        width={350}
        height={200}
        alt="logo" />
      </div>
      {!success &&
        <div className={cn("flex justify-center flex-col gap-6 p-10", className)} {...props}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <span className="sr-only">ANSA Health</span>
                </a>
                <h3 className="font-bold">Login</h3>
                <div className="muted-text">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {error && <p className="text-xs text-red-400">{error}</p>}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="useremail"
                    value={useremail}
                    onChange={(e)=> setUserEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                  value={userpass}
                  onChange={(e)=> setUserpass(e.target.value)}
                  id="password" type="password" name="userpass" required />
                </div>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  className={cn("w-full")}
                >
                  {success ? (
                    <>
                      <Check />
                      Success
                    </>
                  ) : (
                    <>Login</>
                  )}
                </Button>
              </div>
            </div>
          </form>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      }

      {success &&
        <OtpVerification className="mx-auto px-10 py-20" email={useremail} onConfirmChange={(v)=> setOtpConfirmed(v)} />
      }

    </div>
  );
}
