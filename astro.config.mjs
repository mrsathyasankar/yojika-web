import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://yojika.in',
  trailingSlash: 'never',
  // Emit flat files (features.html) so /features serves 200 with no
  // trailing-slash redirect on Cloudflare Pages — matches canonical URLs.
  build: { format: 'file' },
  integrations: [react(), tailwind()],
});
