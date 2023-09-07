import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  darkMode: 'class' as const,
  theme: {
    fontFamily: {
      impact: ['impact'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'rgb(255, 255, 255)',
        input: 'rgb(89, 85, 75)',
        ring: 'rgb(89, 85, 75)',
        background: 'rgb(11, 12, 17)',
        foreground: 'rgb(255,255,255)',
        primary: {
          DEFAULT: 'rgba(46, 99, 235, 1)',
          foreground: 'rgb(255, 255, 255)',
        },
        secondary: {
          DEFAULT: 'rgb(89, 85, 75)',
          foreground: 'rgb(131, 131, 131)',
        },
        destructive: {
          DEFAULT: 'rgb(255, 27, 65)',
          foreground: 'rgb(0, 219, 250)',
        },
        muted: {
          DEFAULT: 'rgb(89, 85, 75)',
          foreground: 'rgb(131, 131, 131)',
        },
        accent: {
          DEFAULT: 'rgb(89, 85, 75)',
          foreground: 'rgb(131, 131, 131)',
        },
        popover: {
          DEFAULT: 'rgb(31, 71, 77)',
          foreground: 'rgb(222, 107, 250)',
        },
        card: {
          DEFAULT: 'rgb(31, 71, 77)',
          foreground: 'rgb(131, 131, 131)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
      textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
    },
  },
  plugins: [forms, typography, containerQueries, require('tailwindcss-animate')],
} satisfies Omit<Config, 'content'>;
