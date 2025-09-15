"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createPublicEvent,
  PublicEvent,
  updatePublicEvent,
} from "@/serverActions/crudPublicEvents";
import "@uploadcare/react-uploader/core.css";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageWithFallback from "../ui/imageWithFallback";
import { DatePicker } from "../ui/datePicker";

type PublicEventFormProps = {
  event?: PublicEvent;
  onSubmitSuccess?: (event: PublicEvent) => void;
  hideSubmitButton?: boolean;
  submitForm?: (submitFn: () => void) => void;
};

export default function PublicEventForm({
  event,
  onSubmitSuccess,
  hideSubmitButton = false,
  submitForm,
}: PublicEventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm<PublicEvent>({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      time: event?.time || "",
      location: event?.location || "",
      image: event?.image || "",
      link: event?.link || "",
      date: event?.date || undefined, // date field
    },
  });

  const image = watch("image");

  const onSubmit = async (data: PublicEvent) => {
    try {
      let result;
      if (event?.id) {
        result = await updatePublicEvent(event.id, data);
      } else {
        result = await createPublicEvent(data);
      }
      if (result.success && result.data) {
        onSubmitSuccess?.(result.data);
        if (event?.id) {
          reset(result.data);
        } else {
          reset();
        }
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
      {/* Image Preview */}
      <div className="form-item flex flex-col items-center gap-3">
        <ImageWithFallback
          src={image}
          alt="Event"
          className="w-[300px] h-[300px] rounded object-cover border"
          width={300}
          height={300}
        />

        <FileUploaderRegular
          useCloudImageEditor={false}
          sourceList="local"
          classNameUploader="uc-light"
          pubkey="9c35a0212e26c1a710ca"
          multiple={false}
          onCommonUploadSuccess={(e) => {
            const cdnUrl = e.successEntries[0].cdnUrl;
            setValue("image", cdnUrl, { shouldDirty: true });
          }}
        />
      </div>

      {/* Title */}
      <div className="form-item">
        <label className="form-item-label">Title</label>
        <Input
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="form-item">
        <label className="form-item-label">Short Description</label>
        <Input
          placeholder="Short description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="form-item">
        <label className="form-item-label">Date</label>
        <Controller
          control={control}
          name="date"
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <DatePicker
              value={field.value ? new Date(field.value) : undefined}
              onChange={field.onChange}
              className="w-full"
            />
          )}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Time */}
      <div className="form-item">
        <label className="form-item-label">Time</label>
        <Input
          placeholder="11:00am - 1:00pm"
          {...register("time", { required: "Time is required" })}
        />
        {errors.time && (
          <p className="text-red-500 text-sm">{errors.time.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="form-item">
        <label className="form-item-label">Location</label>
        <Input
          placeholder="Event location"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      {/* Link */}
      <div className="form-item">
        <label className="form-item-label">Link</label>
        <Input
          placeholder="Event link"
          {...register("link", { required: "Link is required" })}
        />
        {errors.link && (
          <p className="text-red-500 text-sm">{errors.link.message}</p>
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
