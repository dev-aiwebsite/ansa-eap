"use server"

import { authTokenUrl, baseUrl } from "./config";
import { halaxyAccounts } from "./const";


// Simple in-memory token cache
let cachedToken: string | null = null;
let cachedTokenExpiry: number | null = null;

export async function getAccessToken(accountIndex: number): Promise<string | null> {
  const now = Date.now();

  if (cachedToken && cachedTokenExpiry && now < cachedTokenExpiry) {
    return cachedToken;
  }

  const clientId = halaxyAccounts[accountIndex].client_id;
  const clientSecret = halaxyAccounts[accountIndex].client_secret;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(authTokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get token: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  console.log(cachedToken)
  cachedTokenExpiry = now + (data.expires_in - 60) * 1000;
  return cachedToken;
}


export async function halaxyFetch(endpoint: string, options: {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  payload?: unknown
} = {}, accountIndex = 0) {
  const token = await getAccessToken(accountIndex);
  let contentType = 'application/json'

  if (options.method == "PATCH") {
    contentType = 'application/merge-patch+json'
  }


  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/fhir+json",
      "Content-Type": contentType,
    },
    body: options.payload ? JSON.stringify(options.payload) : undefined,
  });



  if (!res.ok) {
    throw new Error(`Halaxy API error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}