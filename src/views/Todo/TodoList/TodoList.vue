<template>
  <Loader v-if="loading" />
  <div v-else>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @deleteTodo="deleteTodo"
      @toggleTodo="toggleTodo"
      @updateTodo="updateTodo"
    />
    <AddTodo @addTodo="addTodo" />
  </div>
</template>

<script lang="ts">
import { Loader } from "@/components";
import { AddTodo } from "../AddTodo";
import { TodoItem } from "../TodoItem";
import { useTodos } from "./useTodos";

export default {
  components: {
    AddTodo,
    Loader,
    TodoItem,
  },
  setup() {
    const {
      addTodo,
      deleteTodo,
      loading,
      todos,
      toggleTodo,
      updateTodo,
    } = useTodos();

    return {
      addTodo,
      deleteTodo,
      loading,
      todos,
      toggleTodo,
      updateTodo,
    };
  },
};
</script>
