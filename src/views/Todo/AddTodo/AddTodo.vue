<template>
  <div>
    <v-form
      v-model="valid"
      @submit.prevent="submitHandler"
      lazy-validation
      ref="formRef"
    >
      <div class="pt-2 pb-2 mb-4">
        <v-row align="center" justify="center">
          <v-col>
            <v-text-field
              v-model="title"
              :rules="titleRules"
              placeholder="Type your next todo"
              ref="inputRef"
              required
            />
          </v-col>
          <v-col class="shrink-column ml-2">
            <v-row dense align="center" justify="center" class="flex-nowrap">
              <v-col>
                <LoadingButton v-if="isSubmitting" />
                <v-btn v-else icon type="submit">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-btn
          icon
          @click.prevent="focusInput"
          aria-label="Focus add todo input"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, SetupContext, toRefs } from "@vue/composition-api";
import { LoadingButton } from "@/components";
import { titleRequiredRule } from "../constants";
import { INewTodoFormData, ITodo, IVuetifyFormRef } from "../types";

interface ITodoItemProps {
  todo?: ITodo;
}

export default {
  components: {
    LoadingButton,
  },
  setup(props: ITodoItemProps, context: SetupContext) {
    const formRef = ref<IVuetifyFormRef>();
    const inputRef = ref<HTMLElement>();
    const isSubmitting = ref<boolean>(false);

    const formData = reactive<INewTodoFormData>({
      title: "",
      titleRules: [titleRequiredRule],
      valid: true,
    });

    const resetForm = () => {
      formData.title = "";
      formData.valid = true;
    };
    const setSubmitting = (submitting: boolean) =>
      (isSubmitting.value = submitting);

    const focusInput = () => inputRef.value?.focus();
    const submitHandler = async () => {
      inputRef.value?.blur();
      if (!formRef.value) return;
      if (formRef.value.validate()) {
        context.emit("addTodo", formData, {
          resetForm,
          resetValidation: formRef.value.resetValidation,
          setSubmitting,
        });
      }
    };

    return {
      ...toRefs(formData),
      focusInput,
      formRef,
      inputRef,
      isSubmitting,
      submitHandler,
    };
  },
};
</script>

<style scoped lang="sass">
.shrink-column
  flex: 0
</style>
