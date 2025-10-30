"use server";

import { getUserAppointments } from "./appointments";

export async function getMyAppointments(patientId: string) {
  if(!patientId){
    return null
  }
  const res = await getUserAppointments(patientId);
  console.log(res, "res");
  return res;
}

