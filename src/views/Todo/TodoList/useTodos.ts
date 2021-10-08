import Vue from "vue";
import axios from "axios";
import { onMounted, ref } from "@vue/composition-api";
import {
  INewTodo,
  INewTodoFormData,
  INewTodoFormHelpers,
  ITodo,
  ITodoFormData,
  ITodoFormHelpers,
  ITodoVariables,
  TTodoResponse,
  TUseTodosReturn,
} from "../types";

export const useTodos = (): TUseTodosReturn => {
  const loading = ref<boolean>(true);
  const todos = ref<ITodo[]>([]);

  const fetchTodos = async () => {
    loading.value = true;
    try {
      const response = await axios.get<ITodo[]>("/todos");
      todos.value = response.data.map((todo) => ({
        ...todo,
        deleteLoading: false,
      }));
    } catch {
      Vue.$toast.open({
        message: "Error while fetching todos",
        type: "error",
      });
    } finally {
      loading.value = false;
    }
  };

  const addTodo = async (
    formData: INewTodoFormData,
    { resetForm, resetValidation, setSubmitting }: INewTodoFormHelpers
  ) => {
    setSubmitting(true);
    const todo: INewTodo = {
      title: formData.title,
      checked: false,
    };
    try {
      const response = await axios.post<ITodoVariables, TTodoResponse>(
        "/todos",
        { todo }
      );
      todos.value.push(response.data);
      resetForm();
      resetValidation();
    } catch {
      Vue.$toast.open({
        message: "Error while adding todo",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTodo = async (todo: ITodo) => {
    todo.deleteLoading = true;
    try {
      await axios.delete(`/todos/${todo.id}`);
      const index = todos.value.findIndex(({ id }) => id === todo.id);
      todos.value.splice(index, 1);
    } catch {
      Vue.$toast.open({
        message: "Error while deleting todo",
        type: "error",
      });
    } finally {
      todo.deleteLoading = false;
    }
  };

  const toggleTodo = async (todo: ITodo) => {
    const checked = todo.checked;
    todo.checked = !todo.checked;
    try {
      await axios.put<ITodoVariables>(`/todos/${todo.id}`, {
        todo: {
          checked: todo.checked,
          title: todo.title,
        },
      });
    } catch {
      Vue.$toast.open({
        message: "Error while toggling todo",
        type: "error",
      });
      todo.checked = checked;
    }
  };

  const updateTodo = async (
    todo: ITodo,
    formData: ITodoFormData,
    { disableEdit, setSubmitting }: ITodoFormHelpers
  ) => {
    setSubmitting(true);
    try {
      const response = await axios.put<ITodoVariables, TTodoResponse>(
        `/todos/${todo.id}`,
        {
          todo: formData,
        }
      );
      todo.checked = response.data.checked;
      todo.title = response.data.title;
      disableEdit();
    } catch {
      Vue.$toast.open({
        message: "Error while updating todo",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  onMounted(fetchTodos);

  return {
    addTodo,
    deleteTodo,
    loading,
    todos,
    toggleTodo,
    updateTodo,
  };
};
