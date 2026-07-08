import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    react(),
    tailwind({ configFile: './tailwind.config.cjs', applyBaseStyles: false }),
    mdx(),
  ],
});
