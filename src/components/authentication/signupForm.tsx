"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { createUser } from "@/serverActions/crudUsers"; // ✅ use your createUser
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthenticateUser } from "@/serverActions/login_logout";

type SignupFormData = {
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  password: string;
};

export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

async function onSubmit(data: SignupFormData) {
  setIsLoading(true);
  setError("");

  try {
    // 1. Create user
    const res = await createUser({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      company: data.company,
    });

    if (!res.success || !res.data) {
      setError(res.message || "Unable to register");
      return;
    }

    // 2. Auto-login
    const loginRes = await AuthenticateUser({
      useremail: data.email,
      userpass: data.password,
    });

    if (!loginRes) {
      setError("Registered but login failed");
      return;
    }

    setSuccess(true);

    // 3. Redirect to dashboard or res.redirectUrl
    router.push(loginRes.redirectUrl ?? "/dashboard");
  } catch (err) {
    const typedError = err as Error;
    setError(typedError?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="grid grid-cols-2 rounded-3xl overflow-hidden bg-white">
      {/* Left panel */}
      <div className="bg-app-blue-600 p-10 items-center justify-center flex">
        <Image
          src="/assets/images/logo.png"
          width={350}
          height={200}
          alt="logo"
        />
      </div>

      {/* Right panel */}
      <div className={cn("flex flex-col gap-6 p-10", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Sign Up</h1>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="grid gap-2 grid-cols-2">
          {/* First name */}
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="John"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && (
              <span className="text-xs text-red-400">
                First name is required
              </span>
            )}
          </div>

          {/* Last name */}
          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="Doe"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && (
              <span className="text-xs text-red-400">
                Last name is required
              </span>
            )}
          </div>
          </div>

          {/* Company */}
          <div className="grid gap-2">
            <Label htmlFor="company">Company Code</Label>
            <Input
              id="company"
              placeholder="Company code"
              {...register("company", { required: true })}
            />
            {errors.company && (
              <span className="text-xs text-red-400">
                Company Code is required
              </span>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-400">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className="text-xs text-red-400">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          <Button isLoading={isLoading} type="submit" className="w-full">
            {success ? (
              <>
                <Check /> Success
              </>
            ) : (
              <>Sign Up</>
            )}
          </Button>
        </form>

        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Already have an account?{" "}
          <Link href="/login" className="ml-1">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
