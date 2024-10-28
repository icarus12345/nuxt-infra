import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./resources/**/*.{ts,js,vue,html,blade.php}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#F00'
      }
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
  ],
}