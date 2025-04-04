/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Add all your environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  