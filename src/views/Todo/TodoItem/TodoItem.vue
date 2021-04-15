<template>
  <div>
    <v-form
      v-model="valid"
      @submit.prevent="submitHandler"
      lazy-validation
      ref="formRef"
    >
      <div class="wrapper pt-2 pb-2">
        <v-row align="center" justify="center">
          <v-col class="shrink-column mr-2">
            <v-checkbox v-model="checked" @change="toggleTodo" />
          </v-col>
          <v-col>
            <v-text-field
              v-if="editable"
              v-model="title"
              :class="{ checkedTodo: checked }"
              :rules="titleRules"
              placeholder="Type your todo here"
              ref="inputRef"
              required
            />
            <div
              v-else
              :class="{ clickableTodo: true, checkedTodo: checked }"
              @click="toggleTodo"
            >
              {{ todo.title }}
            </div>
          </v-col>
          <v-col class="shrink-column ml-2">
            <v-row dense align="center" justify="center" class="flex-nowrap">
              <v-col>
                <LoadingButton v-if="editable && isSubmitting" />
                <v-btn v-else-if="editable && !isSubmitting" icon type="submit">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  aria-label="Edit todo"
                  icon
                  @click.prevent="enableEdit"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <LoadingButton v-if="todo.deleteLoading" />
                <DeleteTodoModal
                  v-else
                  :title="title"
                  @deleteTodo="deleteTodo"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import {
  reactive,
  ref,
  SetupContext,
  toRefs,
  watch,
} from "@vue/composition-api";
import { LoadingButton } from "@/components";
import { titleRequiredRule } from "../constants";
import { DeleteTodoModal } from "../DeleteTodoModal";
import { ITodo, ITodoFormData, IVuetifyFormRef } from "../types";

interface ITodoItemProps {
  todo?: ITodo;
}

export default {
  components: {
    DeleteTodoModal,
    LoadingButton,
  },
  props: {
    todo: Object as PropType<ITodo>,
  },
  setup(props: ITodoItemProps, context: SetupContext) {
    const todo = props.todo;
    const editable = ref<boolean>(false);
    const formRef = ref<IVuetifyFormRef>();
    const inputRef = ref<HTMLElement>();
    const isSubmitting = ref<boolean>(false);

    const formData = reactive<ITodoFormData>({
      checked: todo?.checked || false,
      title: todo?.title || "",
      titleRules: [titleRequiredRule],
      valid: true,
    });

    const setSubmitting = (submitting: boolean) =>
      (isSubmitting.value = submitting);

    const deleteTodo = () => context.emit("deleteTodo", todo);
    const disableEdit = () => (editable.value = false);
    const enableEdit = () => {
      editable.value = true;
      setTimeout(() => inputRef.value?.focus());
    };
    const submitHandler = async () => {
      if (formRef.value?.validate()) {
        context.emit("updateTodo", todo, formData, {
          disableEdit,
          setSubmitting,
        });
      }
    };
    const toggleTodo = () => context.emit("toggleTodo", todo);

    watch(
      () => [todo?.checked, todo?.title],
      () => {
        formData.checked = todo?.checked || false;
        formData.title = todo?.title || "";
      }
    );

    return {
      ...toRefs(formData),
      deleteTodo,
      editable,
      enableEdit,
      formRef,
      inputRef,
      isSubmitting,
      submitHandler,
      toggleTodo,
    };
  },
};
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/main.sass'

.wrapper
  border-bottom: 1px solid map-get($grey, 'lighten-2')

.shrink-column
  flex: 0

.checkedTodo
  text-decoration: line-through

.clickableTodo
  cursor: pointer
</style>
