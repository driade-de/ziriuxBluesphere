import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Borramos la parte de eslint que dio el aviso amarillo
};

export default nextConfig;