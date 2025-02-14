import { type Options } from "@emotion/cache";
interface CustomEnv {
  NODE_ENV: "development" | "production";
  VITE_HA_URL: string;
  VITE_FOLDER_NAME: string;
  VITE_SSH_USERNAME: string;
  VITE_SSH_PASSWORD: string;
  VITE_SSH_HOSTNAME: string;
  VITE_HA_TOKEN: string;
  [key: string]: unknown;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.mp4" {
  const value: string;
  export default value;
}
declare module "*.png" {
  const value: string;
  export default value;
}

// For Vite's import.meta.env
interface ImportMeta {
  env: CustomEnv;
}

// For Node's process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv extends CustomEnv {}
  }
  interface Window {
    hakit_cache: Options;
  }
}

import React from "react";
declare module "react" {
  interface Attributes {
    css?: CSSInterpolation;
    cssStyles?: CSSInterpolation;
  }
}
