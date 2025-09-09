import type { NextConfig } from "next";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("❌ Missing required env variable: NEXT_PUBLIC_API_URL");
}

const backendUrl = new URL(process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port || "", // safe default if no port in prod
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
