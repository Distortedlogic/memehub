import baseConfig from 'tailwind/tailwind.config';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/**/*.{ts,tsx}', '../../packages/meme-maker/**/*.{ts,tsx}'],
  ...baseConfig,
} satisfies Config;
