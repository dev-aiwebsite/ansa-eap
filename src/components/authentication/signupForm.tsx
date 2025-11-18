"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getCompanyByCode } from "@/serverActions/crudCompanies";
import { createUser, getUsersByCompany } from "@/serverActions/crudUsers";
import { AuthenticateUser } from "@/serverActions/login_logout";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpVerification from "../OtpVerification";

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
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpConfirmed, setOtpConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!otpConfirmed) return;
    const { email, password } = getValues();
    const credentials = {
      useremail: email,
      userpass: password,
    };
    async function login() {
      const authRes = await AuthenticateUser(credentials, false);
      router.push(authRes?.redirectUrl);
    }
    login();
  }, [otpConfirmed]);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      // 1️⃣ Validate company exists
      const { data: company } = await getCompanyByCode(data.company);
      console.log(company, "company");
      if (!company) {
        setError("company", {
          type: "manual",
          message: "Company not found",
        });
        setIsLoading(false);
        return;
      }

      // 2️⃣ Get current users in company
      const usersRes = await getUsersByCompany(company.code);
      const currentUsersCount =
        usersRes.success && usersRes.data ? usersRes.data.length : 0;

      // 3️⃣ Check max users restriction
      if (currentUsersCount >= company.max_users) {
        setError("company", {
          type: "manual",
          message: `Company has reached maximum users`,
        });
        setIsLoading(false);
        return;
      }
      // 4️⃣ Create user
      const res = await createUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        company: data.company,
      });

      if (!res.success || !res.data) {
        let message = "Unable to register";
        if (res.message.includes("users_email_key")) {
          message = "Email is already registered.";
        }

        setError("root", {
          type: "manual",
          message: message,
        });
        setIsLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      const typedError = err as Error;
      setError("root", { type: "manual", message: typedError.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden bg-white">
      <div className="bg-app-green-400 p-5 md:p-10 items-center justify-center flex">
            <Image 
            className="max-md:w-[120px]"
            src="/assets/images/elevate-white.png"
            width={350}
            height={200}
            alt="logo" />
      </div>

      {/* Right panel */}
      {!success && (
        <div className={cn("flex flex-col gap-6 p-10", className)} {...props}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl font-bold">Sign Up</h1>
            </div>

            {/* Root / form-level errors */}
            {errors.root && (
              <p className="text-xs text-red-400 text-center">
                {errors.root.message}
              </p>
            )}

            <div className="grid gap-2 grid-cols-2">
              {/* First Name */}
              <div className="grid gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  placeholder="John"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                />
                {errors.first_name && (
                  <span className="text-xs text-red-400">
                    {errors.first_name.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="grid gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Doe"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
                {errors.last_name && (
                  <span className="text-xs text-red-400">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="grid gap-2">
              <Label htmlFor="company">Company Code</Label>
              <Input
                id="company"
                placeholder="Code"
                {...register("company", { required: "Company is required" })}
              />
              {errors.company && (
                <span className="text-xs text-red-400">
                  {errors.company.message}
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
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-xs text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-xs text-red-400">
                  {errors.password.message}
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
      )}
      {success && (
        <OtpVerification
          className="mx-auto px-10 py-20"
          email={getValues("email")}
          onConfirmChange={(v) => setOtpConfirmed(v)}
        />
      )}
    </div>
  );
}
