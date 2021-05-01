<template>
  <Loader v-if="loading" />
  <div v-else>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @openDeleteModal="openDeleteModal"
      @toggleTodo="toggleTodo"
      @updateTodo="updateTodo"
    />
    <AddTodo @addTodo="addTodo" />
    <DeleteTodoModal
      :todo="deleteTodoItem"
      @closeDeleteModal="closeDeleteModal"
      @deleteTodo="deleteTodo"
    />
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/composition-api";
import { Loader } from "@/components";
import { AddTodo } from "../AddTodo";
import { DeleteTodoModal } from "../DeleteTodoModal";
import { TodoItem } from "../TodoItem";
import { ITodo } from "../types";
import { useTodos } from "./useTodos";

export default {
  components: {
    AddTodo,
    DeleteTodoModal,
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
    const deleteTodoItem = ref<ITodo>();
    const closeDeleteModal = () => (deleteTodoItem.value = undefined);
    const openDeleteModal = (todo: ITodo) => (deleteTodoItem.value = todo);

    return {
      addTodo,
      closeDeleteModal,
      deleteTodo,
      deleteTodoItem,
      loading,
      openDeleteModal,
      todos,
      toggleTodo,
      updateTodo,
    };
  },
};
</script>
