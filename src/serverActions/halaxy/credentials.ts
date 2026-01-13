"use server"

import { authTokenUrl, baseUrl } from "./config";

const halaxyAccounts = [
  {
    account_name: "Realworld Psychology",
    client_id: "7c06ce128f43f8f18395664f8ef62636",
    client_secret: "4fe1540ac6ad2132d28aa9ff38854d9e0e95462eaecea7905146b41939f2180ceed6a0de84995c4b442fae5d67e3e8fe3ef3c6e89240a6063a707f8555c588a5",
  },
  {
    account_name: "Ballarat Psychology Clinic",
    client_id: "5e048d8260281c14a17bc4801a4ab424",
    client_secret: "e750aed87f9d6e4819b01524bb82ae67a2f72b287b09665463fe6d9dc26ffc3852fc56c97ba98f6156973c7f1a2d809983c24c9e32e5bfa432554e79ca6c2546",
  },
  {
    account_name: "Melton Psychology Clinic",
    client_id: "",
    client_secret: "",
  },
];



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