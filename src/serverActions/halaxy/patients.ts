"use server";

import { halaxyFetch } from "./credentials";

export type PatientEntry = {
    resourceType: string;
    id: string;
    [key: string]: unknown;
};

type PatientResource = {
  resource: PatientEntry;
};

export type PatientRecords = {
  entry: PatientResource[];
};

export async function getUserPatientRecord(email:string){
     const res =  await halaxyFetch(`/Patient?page=1&_count=30&email=${encodeURIComponent(email)}&_include=Patient%3Ageneral-practitioner`) as PatientRecords;
     if(res.entry.length === 0) return null

       const patientData = res.entry.filter(
            (i) => i.resource.resourceType === "Patient"
        )[0];

    return patientData.resource
}