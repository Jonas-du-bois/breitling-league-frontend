/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  safelist: [
    // Dynamic positioning classes
    'left-[47px]',
    'top-[-19px]',
    'left-[12px]',
    'top-[-18px]',
    'left-[4px]',
    'top-[4px]',
    'left-[3px]',
    'top-[3px]',
    'left-[1.50px]',
    'top-[6.75px]',
    'top-[3.75px]',
    'left-[13.50px]',
    'top-[2.25px]',
    'left-[15.68px]',
    'w-[0.83px]',
    'h-[1.65px]',
    'left-[1.42px]',
    'top-[1.42px]',
    // Quiz Question Type 1 specific classes
    'w-96',
    'h-[874px]',
    'bg-color-primary-blue-100',
    'w-80',
    'h-14',
    'left-[32px]',
    'top-[736px]',
    'bg-button-background-color',
    'text-button-label-color-dark',
    'font-italian-plate-no2',
    'h-44',
    'top-[189px]',
    'bg-color-secondary-white',
    'text-color-primary-yellow-100',
    'text-color-secondary-black',
    'text-color-functional-success-100',
    'bg-color-functional-success-100',
    'text-color-functional-error-100',
    'bg-color-functional-error-100',
    'text-color-secondary-white',
    'top-[424px]',
    'h-11',
    'min-w-11',
    'min-h-11',
    'shadow-[0px_4px_8px_0px_rgba(255,199,43,0.40)]',
    'shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]',
    'rounded-[999px]',
    'w-20',
    'h-20',
    'w-16',
    'h-16',
    'left-[6.08px]',
    'top-[6.08px]',
    'w-72',
    'w-8',
    'h-2.5',
    'font-inter',
    'font-sf-pro',
    'left-[41px]',
    'top-[-3px]',
    'left-[21px]',
    'top-[-1px]',
    'h-3.5',
    'w-3',
    'h-3',
    // Dimensions
    'w-40',
    'h-52',
    'w-4',
    'h-4',
    'min-w-[160px]',
    'w-[160px]',
    'h-[208px]',
    // Border radius
    'rounded-[100px]',
    'rounded-t-lg',
    'rounded-full',
    // Box shadows
    'shadow-[0px_0px_8px_0px_rgba(193,200,210,1.00)]',
    // Font families
    'font-italian-plate-no2',// Custom colors
    'bg-color-primary-yellow-100',
    'text-color-secondary-black',
    'text-card-text-color-dark',
    'text-color-primary-yellow-100',
    'text-color-primary-blue-100',
    'bg-card-background-color-light',
    'bg-color-secondary-grey-100',
    'text-badge-label-color-light',
    'border-color-secondary-black',
    'border-2',
    'outline-card-stroke-color',
    'outline-color-primary-blue-100',
    'outline-icon-color-dark-default',
    'outline-button-stroke-color-dark',
    'text-button-label-color-dark',
    'bg-button-background-color-disabled',
    'text-button-label-color-light-disabled','text-button-label-color-light-disabled',
    'border-t',
    'border-color-primary-blue-100',
    'hover:bg-gray-100',
    'transition-colors',
    'max-w-md',
    'leading-tight',
    'items-baseline',
    'backdrop-blur-[2px]',
    'bg-white/90',
    'tracking-widest',    'text-icon-color-dark-default',
    'text-icon-color-highlighted',
    'bg-icon-color-dark-default',
    'bg-icon-color-highlighted',
    'outline-icon-color-dark-default',
    'border-icon-color-highlighted',
    'bg-zinc-500'
  ],
  theme: {
    extend: {      colors: {
        // Breitling League Custom Colors        
        'color-secondary-black': '#09091A',
        'color-primary-blue-100': '#072C54',
        'card-text-color-dark': '#072C54',
        'card-stroke-color': '#072C54',
        'color-secondary-grey-100': '#09091A',
        'icon-color-dark-default': '#09091A',
        'badge-label-color-light': '#76787B',
        'color-primary-yellow-100': '#FFC72C',
        'card-background-color-light': '#FFFFFF',
        'color-secondary-white': '#FFFFFF',
        'color-functional-success-100': '#39A05D',
        'color-functional-error-100': '#B9473B',
        'button-background-color': '#FFC72C',
        // Button Colors
        'button-stroke-color-dark': '#072C54',
        'button-label-color-dark': '#072C54',
        'button-background-color-disabled': '#C1C8D2',
        'button-label-color-light-disabled': '#FFFFFF',
        // Navigation Colors
        'icon-color-highlighted': '#FFC72C',
        'color-secondary-grey': '#71717B',
      },      fontFamily: {
        'italian-plate': ['Italian Plate No2', 'Inter', 'sans-serif'],
        'italian-plate-no2': ['Italian Plate No2', 'Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sf-pro': ['SF Pro Text', 'system-ui', 'sans-serif'],
      },width: {
        '80': '20rem',  // 320px 
        '72': '18rem',  // 288px 
        '60': '15rem',  // 240px 
        '96': '25.125rem',  // 402px - exact width from spec
        '32': '8rem',   // 128px - for unit cards
      },
      height: {
        '28': '7rem',   // 112px
        '6': '1.5rem',  // 24px
        '32': '8.125rem',   // 130px - exact height from spec
        '52': '13rem',  // 208px - for unit cards
      },
      gap: {
        '6': '1.5rem', // 24px - smaller than original 32px
        '8': '2rem',   // 32px
      },
      padding: {
        '8': '2rem',   // 32px
      }
    },
  },
  plugins: [],
}
