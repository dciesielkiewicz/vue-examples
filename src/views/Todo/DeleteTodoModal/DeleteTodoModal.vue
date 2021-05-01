<template>
  <v-dialog
    v-if="todo"
    aria-labelledby="delete-todo-title"
    v-model="todo"
    width="400"
  >
    <v-card>
      <v-card-title class="headline" id="delete-todo-title">
        Delete Todo
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete todo: {{ todo.title }}?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-row dense align="center" justify="center">
          <v-col>
            <v-btn color="primary" text @click="closeDeleteModal">
              Cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" @click="deleteTodo"> Delete </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType } from "vue";
import { SetupContext } from "@vue/composition-api";
import { ITodo } from "../types";

interface IDeleteTodoModalProps {
  todo?: ITodo;
}

export default {
  props: {
    todo: Object as PropType<ITodo>,
  },
  setup(props: IDeleteTodoModalProps, context: SetupContext) {
    const closeDeleteModal = () => context.emit("closeDeleteModal");
    const deleteTodo = () => {
      context.emit("deleteTodo", props.todo);
      closeDeleteModal();
    };

    return {
      closeDeleteModal,
      deleteTodo,
    };
  },
};
</script>
