"use server";

import { getUserAppointments } from "./appointments";
import { getUserPatientRecord } from "./patients";

type PatientEntry = {
  resource: {
    resourceType: string;
    id: string;
    [key: string]: unknown;
  };
};

type PatientRecords = {
  entry: PatientEntry[];
};

export async function getMyAppointments(userEmail: string) {
  const patientRecords: PatientRecords = await getUserPatientRecord(userEmail);

  const patientEntry = patientRecords.entry.filter(
    (i: PatientEntry) => i.resource.resourceType === "Patient"
  )[0];

  if (!patientEntry) {
    throw new Error("No patient record found");
  }

  const patientId = patientEntry.resource.id;
  console.log(patientId, "patientId");

  const res = await getUserAppointments(patientId);
  console.log(res, "res");
  return res;
}

