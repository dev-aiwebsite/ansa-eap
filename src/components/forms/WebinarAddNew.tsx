"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWebinar, Webinar } from "@/serverActions/crudWebinars";


export default function WebinarAddNew() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Webinar>();

  const onSubmit = async (data: Webinar) => {
    console.log("Form data:", data);

      try {
        const result = await createWebinar(data)
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
            <label className="form-item-label">Description</label>
            <Textarea placeholder="Write description" {...register("description")} />
          </div>

          <Button className="float-right" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
  );
}
