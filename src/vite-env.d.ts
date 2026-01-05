/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_NANO_BANANA_KEY: string;
  readonly VITE_FORMSPREE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
