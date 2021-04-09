<template>
  <v-app>
    <Layout>
      <router-view />
    </Layout>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Layout } from "./components";

export default Vue.extend({
  name: "App",

  components: {
    Layout,
  },

  data: () => ({
    //
  }),
});
</script>
