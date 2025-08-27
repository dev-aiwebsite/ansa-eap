import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.abc.net.au", // allow all subdomains of abc.net.au
      },
      {
        protocol: "https",
        hostname: "**.abc-cdn.net.au", // allow all subdomains of abc-cdn.net.au
      },
      {
        protocol: "https",
        hostname: "ansahealth.com.au",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "**.wellbeing.com.au", // ✅ allow wellbeing.com.au + subdomains
      },
      {
        protocol: "https",
        hostname: "**.squarespace-cdn.com", // ✅ allow wellbeing.com.au + subdomains
      },
    ],
  },
};

export default nextConfig;
