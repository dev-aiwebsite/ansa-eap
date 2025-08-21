import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains:[
      "ansahealth.com.au",
      "ucarecdn.com"
    ], // allow external images
  },
};

export default nextConfig;
