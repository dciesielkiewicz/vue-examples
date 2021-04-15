<template>
  <v-dialog
    aria-labelledby="delete-todo-title"
    v-model="deleteDialogOpened"
    width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn aria-label="Delete todo" icon v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline" id="delete-todo-title">
        Delete Todo
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete todo: {{ title }}?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-row dense align="center" justify="center">
          <v-col>
            <v-btn color="primary" text @click="deleteDialogOpened = false">
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
import { ref, SetupContext } from "@vue/composition-api";

interface IDeleteTodoModalProps {
  title?: string;
}

export default {
  setup(props: IDeleteTodoModalProps, context: SetupContext) {
    const title = props.title;
    const deleteDialogOpened = ref<boolean>(false);
    const closeDeleteDialog = () => context.emit("closeDeleteDialog");
    const deleteTodo = () => context.emit("deleteTodo");

    return {
      closeDeleteDialog,
      deleteDialogOpened,
      deleteTodo,
      title,
    };
  },
};
</script>
