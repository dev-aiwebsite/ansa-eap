"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconFacebook, IconGoogle } from "@/icons";
import { AuthenticateUser } from "@/serverActions/login_logout";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const form = e.target as HTMLFormElement
    if(!form) return
    const formData = new FormData(form)
    try {
        const res = await AuthenticateUser(formData)
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
    <div className="grid grid-cols-2 rounded-3xl overflow-hidden bg-white">
      <div className="bg-app-blue-600 p-10 items-center justify-center flex">
        <Image 
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
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="userpass" required />
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
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" className="w-full">
              <IconFacebook />
              </Button>
              <Button variant="outline" className="w-full">
                <IconGoogle/>
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
