import { defineNuxtConfig } from "nuxt/config";


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["nuxt-primevue"],
  // css: ["primevue/resources/themes/lara-dark-teal/theme.css"],
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      include: ["InputText", "Button","Checkbox","Dropdown","Calendar","InputSwitch","Message","Sidebar"],
      // exclude: ["editor", "chart"],
    },
  },
});
