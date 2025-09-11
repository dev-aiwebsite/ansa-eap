import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ucarecdn.com", // allow ALL Uploadcare CDN subdomains
      },
      {
        protocol: "https",
        hostname: "**.ucarecd.net", // allow ALL Uploadcare CDN subdomains
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com", // root domain
      },
      {
        protocol: "https",
        hostname: "**.abc.net.au",
      },
      {
        protocol: "https",
        hostname: "**.abc-cdn.net.au",
      },
      {
        protocol: "https",
        hostname: "ansahealth.com.au",
      },
      {
        protocol: "https",
        hostname: "**.wellbeing.com.au",
      },
      {
        protocol: "https",
        hostname: "**.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "watersedgecounselling.com",
      },
    ],
  },
};

export default nextConfig;
