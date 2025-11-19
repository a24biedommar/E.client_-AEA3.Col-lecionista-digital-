import { createApp } from "vue";
import App from "./App.vue";
//1.IMPORTEM EL ROUTER QUE ESTA A src/router/index.js
import router from "./router/index.js";

//2. AFEGIM QU EL'APLICACIO USI EL ROUTER
createApp(App).use(router).mount("#app");
