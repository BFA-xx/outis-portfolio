import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's root to this project. Without it, Next walks up and finds
  // the pnpm-lock.yaml in the home directory and treats that as the workspace
  // root — which makes it watch the entire home folder.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
