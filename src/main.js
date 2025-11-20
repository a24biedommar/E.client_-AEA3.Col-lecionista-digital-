import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

//1.IMPORTEM EL ROUTER QUE ESTA A src/router/index.js
import router from "./router/index.js";

const app = createApp(App);

// 2. CREEM LA INSTÀNCIA DE PINIA
const pinia = createPinia();

// 3. USEM PINIA ABANS DE MUNTAR L'APP
app.use(pinia);
app.use(router);
app.mount("#app");
