import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#0A0A0A',
  			foreground: '#FFFFFF',
  			card: {
  				DEFAULT: '#181818',
  				foreground: '#FFFFFF'
  			},
  			popover: {
  				DEFAULT: '#121212',
  				foreground: '#FFFFFF'
  			},
  			primary: {
  				DEFAULT: '#2196F3',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#1565C0',
  				foreground: '#FFFFFF'
  			},
  			muted: {
  				DEFAULT: '#121212',
  				foreground: '#BDBDBD'
  			},
  			accent: {
  				DEFAULT: '#9C27B0',
  				foreground: '#FFFFFF'
  			},
  			destructive: {
  				DEFAULT: '#FF5252',
  				foreground: '#FFFFFF'
  			},
  			border: '#2A2A2A',
  			input: '#2A2A2A',
  			ring: '#2196F3',
  			chart: {
  				'1': '#2196F3',
  				'2': '#9C27B0',
  				'3': '#00E676',
  				'4': '#FFC107',
  				'5': '#FF5252'
  			},
  			sidebar: {
  				DEFAULT: '#0A0A0A',
  				foreground: '#FFFFFF',
  				primary: '#2196F3',
  				primaryForeground: '#FFFFFF',
  				accent: '#121212',
  				accentForeground: '#FFFFFF',
  				border: '#2A2A2A',
  				ring: '#2196F3'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					opacity: '0.5'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			'float': {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'float': 'float 3s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
