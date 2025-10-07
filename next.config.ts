import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nauka.vps-poliban.my.id",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
