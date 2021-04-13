import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import Vuetify from "vuetify/lib/framework";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(Vuetify);

const vuetify = new Vuetify({});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
