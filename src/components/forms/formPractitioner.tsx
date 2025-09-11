"use client";
import { Option } from "@/components/multiSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

import {
  Practitioner,
  createPractitioner,
  updatePractitioner,
  getPractitionerById,
} from "@/serverActions/crudPractitioners";

import MultiSelect from "../multiSelect";
import {
  EXPERTISE_OPTIONS,
  IDENTIFICATION_OPTIONS,
  LANGUAGE_OPTIONS,
  MODALITY_OPTIONS,
  OTHER_SERVICES_OPTIONS,
  PATIENT_FOCUS_OPTIONS,
  PROFESSIONAL_REGISTRATION_OPTIONS,
} from "@/lib/const";
import Image from "next/image";
import KeyValueInput from "../ui/keyValueInput";
import FormDynamicFields from "../ui/formDynamicFields";
import FieldGroup from "../ui/fieldGroup";

//
// 🔹 Mapper helpers
//
function stringsToOptions(
  values: string[] | null | undefined,
  allOptions: Option[]
): Option[] {
  if (!values) return [];
  return values
    .map((v) => allOptions.find((opt) => opt.value === v))
    .filter((opt): opt is Option => !!opt);
}

function optionsToStrings(options: Option[] | null | undefined): string[] {
  if (!options) return [];
  return options.map((opt) => opt.value);
}

type FormPractitionerProps = {
  practitionerId?: string;
  onSubmitSuccess?: (practitioner: Practitioner) => void;
  hideSubmitButton?: boolean;
  submitForm?: (submitFn: () => void) => void;
};

export default function FormPractitioner({
  practitionerId,
  onSubmitSuccess,
  hideSubmitButton = false,
  submitForm,
}: FormPractitionerProps) {
  const [loading, setLoading] = useState<boolean>(!!practitionerId);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<Practitioner>({
    defaultValues: {
      first_name: "",
      last_name: "",
      title: "",
      email: "",
      profile_img: "",
      description: "",
      profession: "",
      location: "",
      clinic: "",
      booking_link: "",
      expertise: [],
      languages: [],
      modalities: [],
      accreditations: [],
      patient_focus: [],
      certifications: [],
      other_services: [],
      qualifications: [],
    },
  });

  const profileImg = watch("profile_img");

  // Load practitioner for edit
  useEffect(() => {
    if (!practitionerId) return;
    (async () => {
      try {
        setLoading(true);
        const result = await getPractitionerById(practitionerId);
        if (result.success && result.data) {
       reset({
        ...result.data,
        expertise: stringsToOptions(result.data.expertise, EXPERTISE_OPTIONS) as unknown as string[],
        languages: stringsToOptions(result.data.languages, LANGUAGE_OPTIONS) as unknown as string[],
        modalities: stringsToOptions(result.data.modalities, MODALITY_OPTIONS) as unknown as string[],
        patient_focus: stringsToOptions(result.data.patient_focus, PATIENT_FOCUS_OPTIONS) as unknown as string[],
        other_services: stringsToOptions(result.data.other_services, OTHER_SERVICES_OPTIONS) as unknown as string[],
      });

        }
      } catch (error) {
        console.error("Failed to load practitioner:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [practitionerId, reset]);

  const onSubmit = async (data: Practitioner) => {
    const formatted = {
      ...data,
      expertise: optionsToStrings(data.expertise as unknown as Option[]),
      languages: optionsToStrings(data.languages as unknown as Option[]),
      modalities: optionsToStrings(data.modalities as unknown as Option[]),
      patient_focus: optionsToStrings(data.patient_focus as unknown as Option[]),
      other_services: optionsToStrings(data.other_services as unknown as Option[]),
    };
    

    try {
      let result;
      if (practitionerId) {
        result = await updatePractitioner(practitionerId, formatted);
      } else {
        result = await createPractitioner(formatted);
      }

      if (result.success && result.data) {
        onSubmitSuccess?.(result.data);
        if(practitionerId){
          reset({
          ...result.data,
          expertise: stringsToOptions(result.data.expertise, EXPERTISE_OPTIONS) as unknown as string[],
          languages: stringsToOptions(result.data.languages, LANGUAGE_OPTIONS) as unknown as string[],
          modalities: stringsToOptions(result.data.modalities, MODALITY_OPTIONS) as unknown as string[],
          patient_focus: stringsToOptions(result.data.patient_focus, PATIENT_FOCUS_OPTIONS) as unknown as string[],
          other_services: stringsToOptions(result.data.other_services, OTHER_SERVICES_OPTIONS) as unknown as string[],
        });


        } else {
          reset()
        }
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Expose submit function externally
  useEffect(() => {
    if (submitForm) {
      submitForm(() => handleSubmit(onSubmit));
    }
  }, [submitForm, handleSubmit]);

  if (loading) {
    return <p>Loading practitioner...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Profile Image */}

      <div className="form-item flex flex-col items-center gap-3">
        {profileImg ? (
          <Image
            src={profileImg}
            alt="Profile"
            width={200}
            height={200}
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            No Image
          </div>
        )}
        <FileUploaderRegular
          pubkey="9c35a0212e26c1a710ca"
          multiple={false}
          onCommonUploadSuccess={(e) => {
            const cdnUrl = e.successEntries[0].cdnUrl;
            setValue("profile_img", cdnUrl, { shouldDirty: true });
          }}
        />
      </div>

      <FieldGroup label="Personal Details">
        <div className="space-y-8">
          <div className="flex flex-row w-full">
          <Input placeholder="Title" {...register("title")} />
          <Input
            placeholder="First name"
            {...register("first_name", { required: true })}
          />
          <Input
            placeholder="Last name"
            {...register("last_name", { required: true })}
          />
          </div>
            <Input
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
      </FieldGroup>
      <FieldGroup label="Qualifications & Credentials">
          <div className="space-y-8">
              <Input placeholder="Profession" {...register("profession")} />
              <Textarea placeholder="Professional Description" {...register("description")} />
          </div>

      <div className="space-y-2">
        <label className="form-item-label">
          Identifications
        </label>
        <Controller
          control={control}
          name="identifications"
          render={({ field }) => (
            <FormDynamicFields
              addBtn={{
                text: "ADD IDENTIFICATION",
                className: "text-[11px] font-[600] text-primary tracking-wider mt-2",
              }}
              formControl={
                <KeyValueInput options={IDENTIFICATION_OPTIONS} />
              }
              onChange={(v) => {
                console.log(v);
                return field.onChange;
              }}
              
              initialValues={field.value}
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <label className="form-item-label">
          Professional Registration Number
        </label>
        <Controller
          control={control}
          name="registrations"
          render={({ field }) => (
            <FormDynamicFields
              addBtn={{
                text: "ADD REGISTRATION",
                className: "text-[11px] font-[600] text-primary tracking-wider mt-2",
              }}
              formControl={
                <KeyValueInput options={PROFESSIONAL_REGISTRATION_OPTIONS} />
              }
              onChange={(v) => {
                console.log(v);
                return field.onChange;
              }}
              
              initialValues={field.value}
            />
          )}
        />
      </div>
      </FieldGroup>
     
    

      

      {/* Expertise */}
      <FieldGroup 
      label="EXPERTISE & LANGUAGE">
      <div className="space-y-2">
        {/* <label className="form-item-label">Expertise</label> */}
        <Controller
          name="expertise"
          control={control}
          render={({ field }) => (
            <MultiSelect
              placeholder="Expertise"
              options={EXPERTISE_OPTIONS}
              value={(field.value as unknown as Option[]) || []} // convert string[] → Option[]
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Languages */}
      <div className="space-y-2">
        {/* <label className="form-item-label">Languages</label> */}
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <MultiSelect
              placeholder="Select languages"
              options={LANGUAGE_OPTIONS}
              value={(field.value as unknown as Option[]) || []}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      </FieldGroup>

     
<FieldGroup label="Other Clinical Credentials & Preferences">
    <Input placeholder="Clinic" {...register("clinic")} />
      <Input placeholder="Location" {...register("location")} />
      <Input placeholder="Booking Link" {...register("booking_link")} />
       <div className="space-y-2">
        <label className="form-item-label">Modalities</label>
        <Controller
          control={control}
          name="modalities"
          render={({ field }) => (
            <MultiSelect
              placeholder="Select modalities"
              options={MODALITY_OPTIONS}
              value={(field.value as unknown as Option[]) || []}
              onChange={field.onChange}
            />
          )}
        />
      </div>
       <div className="space-y-2">
        <label className="form-item-label">Patient Focus</label>
        <Controller
          control={control}
          name="patient_focus"
          render={({ field }) => (
            <MultiSelect
              placeholder="Select from list"
              options={PATIENT_FOCUS_OPTIONS}
              value={(field.value as unknown as Option[]) || []}
              onChange={field.onChange}
            />
          )}
        />
      </div>
       <div className="space-y-2">
        <label className="form-item-label">Other Services</label>
        <Controller
          control={control}
          name="other_services"
          render={({ field }) => (
            <MultiSelect
              placeholder="Select from list"
              options={OTHER_SERVICES_OPTIONS}
              value={(field.value as unknown as Option[]) || []}
              onChange={field.onChange}
            />
          )}
        />
      </div>
</FieldGroup>


      {!hideSubmitButton && (
        <Button className="float-right" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : practitionerId ? "Update" : "Create"}
        </Button>
      )}
    </form>
  );
}
