"use client";
import "@uploadcare/react-uploader/core.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostServiceContext } from "@/context/postServiceContext";
import * as Icons from "@/icons";
import {
  Category,
  createCategory,
  updateCategory,
} from "@/serverActions/crudCategories";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import ImageWithFallback from "../ui/imageWithFallback";

type CategoryEditorProps = {
  categoryId?: string;
};

export default function CategoryEditor({ categoryId }: CategoryEditorProps) {
  const { categories, setCategories } = usePostServiceContext();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Category>({
    defaultValues: {
      label: "",
      type: "post",
      icon: categoryId
        ? categories.find((c) => c.id === categoryId)?.icon ?? ""
        : "",
      image: "",
    },
  });

  // Populate form if editing
  useEffect(() => {
    if (!categoryId) return;
    const cat = categories.find((c) => c.id == categoryId);
    if (cat) {
      reset(cat);
      console.log(cat);
    }
  }, [categories, categoryId, reset]);

  const onSubmit = async (formData: Category) => {
    try {
      if (categoryId) {
        const { data } = await updateCategory(categoryId, formData);

        // Update the category in the context
        if (!data) return;
        setCategories((prev) =>
          prev.map((c) => (c.id === categoryId ? data : c))
        );
        toast.success("Successfully updated", {
          description: data.label,
        });
        reset(data);
      } else {
        const { data } = await createCategory(formData);
        if (!data) return;
        // Add new category to context
        setCategories((prev) => [...prev, data]);
        reset(data);

        toast.success("Successfully created", {
          description: data.label,
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const categoryImage = watch("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Label */}
      <div className="form-item">
        <label className="form-item-label">Label</label>
        <Input
          placeholder="Enter category name"
          {...register("label", { required: "Label is required" })}
        />
        {errors.label && (
          <p className="text-red-500 text-sm">{errors.label.message}</p>
        )}
      </div>
      {/* Type */}
      <div className="form-item">
        <label className="form-item-label">Type</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {/* Only post type for now */}
                <SelectItem value="post">Post</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Icon */}
      <div className="form-item">
        <label className="form-item-label">Icon</label>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value ?? undefined}
            >
              <SelectTrigger className="!h-fit ">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                <div className="flex flex-row flex-wrap w-[500px] max-w-[95vw]">
                  {Object.keys(Icons).map((key) => {
                    const Icon = Icons[key as keyof typeof Icons] as
                      | Icons.IconComponent
                      | undefined;
                    if (!Icon) return null;
                    return (
                      <SelectItem className="!w-fit" key={key} value={key}>
                        <Icon className="!w-13 !h-13" />
                      </SelectItem>
                    );
                  })}
                </div>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* image */}
      <div className="form-item">
        <label htmlFor="" className="form-item-label">
          Image
        </label>
        <div className="flex flex-col items-center gap-2 w-fit">
          <ImageWithFallback
            src={categoryImage}
            alt="Profile"
            width={100}
            height={100}
            className="w-[100px] h-[100px] rounded object-cover"
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileUploaderRegular
                useCloudImageEditor={false}
                sourceList="local"
                classNameUploader="uc-light"
                pubkey="9c35a0212e26c1a710ca"
                multiple={false}
                accept="image/*" // 👈 Only allow images
                onCommonUploadSuccess={(e) => {
                  const cdnUrl = e.successEntries[0].cdnUrl;
                  field.onChange(cdnUrl);
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Submit */}
      <Button className="float-right" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : categoryId ? "Update" : "Save"}
      </Button>
    </form>
  );
}
