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
    // Border radius
    'rounded-[100px]',
    'rounded-t-lg',
    'rounded-full',
    // Box shadows
    'shadow-[0px_0px_8px_0px_rgba(193,200,210,1.00)]',
    // Font families
    'font-italian-plate-no2',
    // Custom colors
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
    'border-t',
    'border-color-primary-blue-100',
    'hover:bg-gray-100',
    'transition-colors',
    'max-w-md',
    'leading-tight',
    'items-baseline'
  ],
  theme: {
    extend: {      colors: {
        // Breitling League Custom Colors        'color-secondary-black': '#000000',
        'color-primary-blue-100': '#072C54',
        'card-text-color-dark': '#072C54',
        'card-stroke-color': '#072C54',
        'color-secondary-grey-100': '#09091A',
        'icon-color-dark-default': '#09091A',
        'badge-label-color-light': '#76787B',
        'color-primary-yellow-100': '#FFC72C',
        'card-background-color-light': '#FFFFFF',
      },      fontFamily: {
        'italian-plate': ['Italian Plate No2', 'Inter', 'sans-serif'],
        'italian-plate-no2': ['Italian Plate No2', 'Inter', 'sans-serif'],
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
