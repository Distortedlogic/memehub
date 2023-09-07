import baseConfig from 'tailwind/tailwind.config';
import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.{ts,tsx}'],
  ...baseConfig,
} satisfies Config;
