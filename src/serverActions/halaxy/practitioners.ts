"use server";

import { halaxyFetch } from "./credentials";

interface Practitioner {
  id: string;
  resourceType: "Practitioner";
  name?: { given: string[]; family: string }[];
  // add more fields as needed
}

interface PractitionerListResponse {
  resourceType: "Bundle";
  entry: { resource: Practitioner }[];
  total?: number;
}

export async function listPractitioners({ page = 1, count = 10 } = {}): Promise<PractitionerListResponse> {
  return halaxyFetch(`/Practitioner?page=${page}&_count=${count}`);
}
