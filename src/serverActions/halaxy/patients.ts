"use server";

import { halaxyFetch } from "./credentials";

export async function getUserPatientRecord(email:string){
     const res =  await halaxyFetch(`/Patient?page=1&_count=30&email=${encodeURIComponent(email)}&_include=Patient%3Ageneral-practitioner`)
    return res
}