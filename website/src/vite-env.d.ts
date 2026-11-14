/// <reference types="vite/client" />

declare module 'virtual:journal-manifest' {
  const manifest: import('./services/posts/posts.types').JournalManifest
  export default manifest
}
