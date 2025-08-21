"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlog, Blog } from "@/serverActions/crudBlogs";
import { slugifyName } from "@/lib/helper";
import { usePathname } from "next/navigation";


export default function BlogAddNew() {
  const pathName = usePathname()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Blog>();

  const onSubmit = async (data: Blog) => {
    console.log("Form data:", data);
    const slug = `${pathName.slice(0,-3)}${slugifyName(data.title)}`
    
      try {
        const result = await createBlog({ ...data, slug })
        console.log(result)
        reset();
        
      } catch (error) {
        console.log(error)
      }
      
  };

  return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-item">
            <label className="form-item-label">Title</label>
            <Input
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="form-item">
            <label className="form-item-label">Author</label>
            <Input
              placeholder="Author name"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          <div className="form-item">
            <label className="form-item-label">Tags</label>
            <Input
              placeholder="Comma-separated"
              {...register("tags", { required: "At least one tag is required" })}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
          </div>

          <div className="form-item">
            <label className="form-item-label">Video link</label>
            <Input placeholder="Video link" {...register("video")} />
          </div>

          <div className="form-item">
            <label className="form-item-label">Thumbnail</label>
            <Input placeholder="Thumbnail link" {...register("thumbnail")} />
          </div>

          <div className="form-item">
        <label className="form-item-label">Duration</label>
        <div className="flex gap-2">
          <Input
            type="number"
            min={0}
            {...register("duration_hours", { valueAsNumber: true })}
            placeholder="Hours"
            className="form-control w-30"
          />
          <Input
            type="number"
            min={0}
            max={59}
            {...register("duration_minutes", { valueAsNumber: true })}
            placeholder="Minutes"
            className="form-control w-30"
          />
        </div>
      </div>

          <div className="form-item">
            <label className="form-item-label">Description</label>
            <Textarea placeholder="Write description" {...register("description")} />
          </div>

          <Button className="float-right" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
  );
}
