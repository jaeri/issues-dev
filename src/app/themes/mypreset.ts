import { definePreset } from "@primeng/themes";
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#111111',
      100: '#1a1a1a',
      200: '#222222',
      300: '#2a2a2a',
      400: '#333333',
      500: '#000000', // <- The actual black color
      600: '#0a0a0a',
      700: '#1a1a1a',
      800: '#2a2a2a',
      900: '#3a3a3a',
      950: '#444444'
    }
  }
});

export default MyPreset;