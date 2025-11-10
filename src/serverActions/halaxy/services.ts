"use server"
import { halaxyFetch } from "./credentials"

 interface FhirBundle {
  resourceType: "Bundle";
  id: string;
  type: "searchset";
  timestamp: string;
  total: number;
  link: {
    relation: string;
    url: string;
  }[];
  entry: {
    fullUrl: string;
    resource: FhirHealthcareService;
    search: {
      mode: string;
    };
  }[];
}

export interface FhirHealthcareService {
  resourceType: "HealthcareService";
  id: string;
  active: boolean;
  name: string;
  providedBy: {
    reference: string;
    type: "Organization";
  };
  extension: {
    url: string;
    valueQuantity?: {
      value: number;
      unit: string;
      system: string;
    };
    valueString?: string;
    valueInteger?: number;
  }[];
}


export async function getHalaxyServices() {
  const res = await halaxyFetch(`/HealthcareService?page=1&_count=30&active=true&name=elevate`) as FhirBundle
  if(res.total === 0) return []
  return res.entry.map(i => i.resource) 
}