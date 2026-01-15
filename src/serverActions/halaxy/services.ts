"use server"
import { getAccountIndexByOrgId } from './const';
import { halaxyFetch } from "./credentials";
import { FhirBundle, FhirHealthcareService, OrgId } from './types';


export async function getHalaxyServices(orgId: OrgId): Promise<FhirHealthcareService[]> {
  const accountIndex = getAccountIndexByOrgId(orgId)
  const res = await halaxyFetch(`/HealthcareService?page=1&_count=30&active=true&name=elevate`,{},accountIndex) as FhirBundle
  if(res.total === 0) return []
  return res.entry.map(i => i.resource) 
}