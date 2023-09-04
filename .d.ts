
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}

interface ImportMeta {
  env: {
    NODE_ENV: 'development' | 'production';
    VITE_HA_URL_DEV: string;
    VITE_HA_URL_PROD: string;
    VITE_WEATHER_API_KEY: string;
    VITE_SSH_USERNAME: string;
    VITE_SSH_PASSWORD: string;
    VITE_SSH_HOSTNAME: string;
    VITE_HA_TOKEN: string;
    [key: string]: unknown;
  };
}