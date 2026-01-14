"use server"

import { authTokenUrl, baseUrl } from "./config";
import { halaxyAccounts } from "./const";


type Token = {
  cachedToken: string | null;
  cachedTokenExpiry: number | null;
}

const tokens: Record<number, Token> = {
  0:{cachedToken: null, cachedTokenExpiry: null},
  1:{cachedToken: null, cachedTokenExpiry: null},
  2:{cachedToken: null, cachedTokenExpiry: null},
}

export async function getAccessToken(accountIndex: number): Promise<string | null> {
  const now = Date.now();
  const {cachedToken, cachedTokenExpiry} = tokens[accountIndex];
  
  if (cachedToken && cachedTokenExpiry && now < cachedTokenExpiry) {
    console.log(cachedToken)
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
  tokens[accountIndex].cachedToken = data.access_token;
  console.log(data.access_token)
  tokens[accountIndex].cachedTokenExpiry = now + (data.expires_in - 60) * 1000;
  return data.access_token;
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