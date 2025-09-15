"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppServiceContext } from "@/context/appServiceContext";
import { updateUser, User } from "@/serverActions/crudUsers";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import Image from "next/image";

type FormAccountProps = {
  onSubmitSuccess?: (user: User) => void;
  hideSubmitButton?: boolean;
  submitForm?: (submitFn: () => void) => void;
};

export default function FormAccount({
  onSubmitSuccess,
  hideSubmitButton = false,
  submitForm,
}: FormAccountProps) {
  const { currentUser, setCurrentUser } = useAppServiceContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<User>({
    defaultValues: {
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      email: currentUser?.email || "",
      profile_img: currentUser?.profile_img || "",
    },
  });

  const profileImg = watch("profile_img");

  const onSubmit = async (data: User) => {
    if (!currentUser?.id) {
      console.log("no current user");
      return;
    }
    try {
      const result = await updateUser(currentUser.id, data);
      if (result.success && result.data) {
        onSubmitSuccess?.(result.data);
        setCurrentUser(result.data);
        reset({
          first_name: result.data.first_name || "",
          last_name: result.data.last_name || "",
          email: result.data.email || "",
          profile_img: result.data.profile_img || "",
        });
      }
    } catch (error) {
      console.log(error);
      reset();
    }
  };

  // Expose submit function externally
  useEffect(() => {
    if (submitForm) {
      submitForm(() => handleSubmit(onSubmit));
    }
  }, [submitForm, handleSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Image Preview */}
      <div className="form-item flex flex-col items-center gap-3">
        {profileImg ? (
          <Image
            src={profileImg}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            No Image
          </div>
        )}

        <FileUploaderRegular
          useCloudImageEditor={false}
          sourceList="local"
          classNameUploader="uc-light"
          pubkey="9c35a0212e26c1a710ca"
          multiple={false}
          onCommonUploadSuccess={(e) => {
            const cdnUrl = e.successEntries[0].cdnUrl;
            setValue("profile_img", cdnUrl, { shouldDirty: true });
          }}
        />
      </div>

      <div className="form-item">
        <label className="form-item-label">First Name</label>
        <Input
          placeholder="First name"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
      </div>

      <div className="form-item">
        <label className="form-item-label">Last Name</label>
        <Input
          placeholder="Last name"
          {...register("last_name", { required: "Last name is required" })}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name.message}</p>
        )}
      </div>

      <div className="form-item">
        <label className="form-item-label">Email</label>
        <Input
          readOnly
          disabled
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {!hideSubmitButton && (
        <Button className="float-right" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      )}
    </form>
  );
}
