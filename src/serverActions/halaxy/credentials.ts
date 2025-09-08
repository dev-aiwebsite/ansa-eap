"use server"
const halaxyAccounts = [
  {
    account_name: "Test",
    client_id: "ccfcf063f384dc4fa68225a79be3627b",
    client_secret: "20233c126287a5ed5d378964045a881f921ad85437c93b593b0d1df0e22915da4a11620667d92a74bb6d2177f56145ed01580da657b4ed9593af15ff31c25c65",
  },
  {
    account_name: "Elevate Psychology",
    client_id: "39a221b207a478d3a47e969aa00dd177",
    client_secret: "737eb4f9e5fc518333087032466f262e953f3f7ff62c8471e5e6bb582b6a056a136881454c07ac3cce7c6db9072fcbe324931ce73ffd1bc7098a29cbb7b5b404",
  },
];

const accountIndex = 1; // select account
const clientId = halaxyAccounts[accountIndex].client_id;
const clientSecret = halaxyAccounts[accountIndex].client_secret;

const authTokenUrl = "https://au-api.halaxy.com/main/oauth/token";
const baseUrl = "https://au-api.halaxy.com/main";

// Simple in-memory token cache
let cachedToken: string | null = null;
let cachedTokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string | null> {
  const now = Date.now();

  if (cachedToken && cachedTokenExpiry && now < cachedTokenExpiry) {
    return cachedToken;
  }

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
  cachedTokenExpiry = now + (data.expires_in - 60) * 1000; // 60s safety buffer
  return cachedToken;
}


export async function halaxyFetch(endpoint: string, options: { method?: string; payload?: unknown } = {}) {
  const token = await getAccessToken();
  console.log(token, 'token')

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/fhir+json",
      "Content-Type": "application/json",
    },
    body: options.payload ? JSON.stringify(options.payload) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Halaxy API error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}