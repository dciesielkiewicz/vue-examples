import axios from "axios";
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import Vuetify from "vuetify/lib/framework";
import VueToast from "vue-toast-notification";
import App from "./App.vue";
import router from "./router";

import "vue-toast-notification/dist/theme-sugar.css";
import "./assets/css/main.css";

axios.defaults.baseURL = "http://localhost:3001";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(Vuetify);
Vue.use(VueToast, {
  position: "bottom-left",
});

const vuetify = new Vuetify({});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
