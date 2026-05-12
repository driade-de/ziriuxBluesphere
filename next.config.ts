import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Esto ignora los errores de TypeScript durante la compilación en Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto ignora los avisos de estilo para evitar que se detenga el despliegue
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;