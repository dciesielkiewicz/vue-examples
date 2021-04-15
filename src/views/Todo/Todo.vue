<template>
  <div>
    <h2 class="text-h2 mb-10">Todo list</h2>
    <v-card elevation="2">
      <div class="pa-8">
        <TodoList />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { TodoList } from "./TodoList";

export default {
  name: "Layout",
  components: {
    TodoList,
  },
};
</script>
