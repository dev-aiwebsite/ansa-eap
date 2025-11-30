"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";
import { Company, createCompany, updateCompany } from "@/serverActions/crudCompanies";
import { cn } from "@/lib/utils";

export default function CompanyForm({
  company,
  className,
}: {
  company?: Company; // optional → create or update
  className?: string;
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Company>({
    defaultValues: company
      ? {
          id: company.id ?? "",
          code: company.code || "",
          name: company.name,
          logo_url: company.logo_url,
          max_users: company.max_users,
          max_booking_credits_per_user: company.max_booking_credits_per_user,
        }
      : {
          name: "",
          code: "",
          logo_url: null,
          max_users: 0,
          max_booking_credits_per_user: 0,
        },
  });

  // Reset when switching between create/edit
  useEffect(() => {
    reset(
      company
        ? {
            id: company.id,
            code: company.code,
            name: company.name,
            logo_url: company.logo_url,
            max_users: company.max_users,
            max_booking_credits_per_user: company.max_booking_credits_per_user,
          }
        : {
            name: "",
            code: "",
            logo_url: null,
            max_users: 0,
            max_booking_credits_per_user: 0,
          }
    );
  }, [company, reset]);

  const logoUrl = watch("logo_url");

  async function onSubmit(values: Company) {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      let result;
      if (company) {
        // update mode
        result = await updateCompany(values.id, values);
      } else {
        // create mode
        result = await createCompany(values);
      }

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Unexpected error, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
   <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
  {/* Company Logo Preview */}
  <div className="form-item flex flex-col items-center gap-3">
    {logoUrl ? (
      <Image
        src={logoUrl}
        alt="Company Logo"
        className="w-24 h-24 object-cover border rounded-md"
        width={96}
        height={96}
      />
    ) : (
      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded-md border">
        No Logo
      </div>
    )}
    <FileUploaderRegular
      useCloudImageEditor={false}
      sourceList="local"
      classNameUploader="uc-light"
      pubkey="927d7568bad196ef7d60"
      multiple={false}
      onCommonUploadSuccess={(e) => {
        const cdnUrl = e.successEntries[0].cdnUrl;
        setValue("logo_url", cdnUrl, { shouldDirty: true });
      }}
    />
  </div>

  {/* Company Name */}
  <div className="space-y-2">
    <Label htmlFor="name">Company Name</Label>
    <Input
      id="name"
      {...register("name", { required: "Company name is required" })}
      placeholder="Acme Inc."
    />
    {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
  </div>

  {/* Company Code */}
  <div className="space-y-2">
    <Label htmlFor="code">Company Code</Label>
    <Input
      id="code"
      {...register("code", { required: "Company Code is required" })}
      placeholder=""
    />
    {errors.code && <p className="text-xs text-red-400">{errors.code.message}</p>}
  </div>

  {/* Max Users */}
  <div className="space-y-2">
    <Label htmlFor="max_users">Max Users</Label>
    <Input
      id="max_users"
      type="number"
      {...register("max_users", {
        required: "Max users is required",
        min: { value: 1, message: "Must be at least 1" },
        valueAsNumber: true,
      })}
    />
    {errors.max_users && (
      <p className="text-xs text-red-400">{errors.max_users.message}</p>
    )}
  </div>

  {/* Max Booking Credits per User */}
  <div className="space-y-2">
    <Label htmlFor="max_booking_credits_per_user">
      Max Booking Credits / User
    </Label>
    <Input
      id="max_booking_credits_per_user"
      type="number"
      {...register("max_booking_credits_per_user", {
        required: "This field is required",
        min: { value: 1, message: "Must be at least 1" },
        valueAsNumber: true,
      })}
    />
    {errors.max_booking_credits_per_user && (
      <p className="text-xs text-red-400">
        {errors.max_booking_credits_per_user.message}
      </p>
    )}
  </div>

  {error && <p className="text-xs text-red-400">{error}</p>}

  <Button type="submit" className="w-full" disabled={isLoading}>
    {success ? (
      <>
        <Check className="mr-2 h-4 w-4" /> Success
      </>
    ) : company ? (
      "Update Company"
    ) : (
      "Create Company"
    )}
  </Button>
</form>

  );
}
