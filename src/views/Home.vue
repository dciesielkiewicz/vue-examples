<template>
  <div>
    <div class="mb-4">
      <h4 class="text-h4">Welcome to My Vue Examples.</h4>
    </div>
    <div class="mb-16">
      <p class="text-body-1">Pick a project you want to discover.</p>
    </div>
    <v-btn link :to="TODO_PATH" color="primary"> Go to TODO App </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TODO_PATH } from "@/router/paths";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      TODO_PATH,
    };
  },
});
</script>
