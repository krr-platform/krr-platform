/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient('
                    + 'from 180deg at 50% 50%, '
                    + 'var(--tw-gradient-stops))',
            },
        },
    },
    daisyui: {
        themes: [
            {
                krr: {
                    primary: '#3b82f6',
                    secondary: '#f97316',
                    accent: '#8b5cf6',
                    neutral: '#737373',
                    'base-100': '#ffffff',
                    info: '#06b6d4',
                    success: '#22c55e',
                    warning: '#eab308',
                    error: '#ef4444',
                },
            },
        ],
    },

    plugins: [require('daisyui')],
};
export default config;
