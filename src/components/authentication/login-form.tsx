"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthenticateUser } from "@/serverActions/login_logout";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useremail,setUserEmail] = useState("")
  const [userpass, setUserpass] = useState("")
    const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    const credentials = {
      useremail,userpass
    }
    
    try {
        const res = await AuthenticateUser(credentials, false)
        console.log(res, 'AuthenticateUser res')
        if(!res){
          setError("Wrong credentials")
          return false
        }
        setSuccess(true)
        router.push(res?.redirectUrl)
    } catch (error) {
      const typedError = error as Error;
      setError(typedError?.message || 'Something went wrong');
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white">
      <div className="bg-app-blue-600 p-5 md:p-10 items-center justify-center flex">
        <Image 
        className="max-md:w-[120px]"
        src="/assets/images/logo.png"
        width={350}
        height={200}
        alt="logo" />
      </div>
      <div className={cn("flex flex-col gap-6 p-10", className)} {...props}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <span className="sr-only">ANSA Health</span>
              </a>
              <h1 className="text-xl font-bold">Login</h1>
              <div className="text-center text-sm">
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
    </div>
  );
}
