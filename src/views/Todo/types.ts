import { ToRefs } from "@vue/composition-api";

export interface IVuetifyFormRef extends Vue {
  resetValidation: () => void;
  validate: () => boolean;
}

export type TTitleRequiredRule = (title: string) => true | "Title is required";

export interface INewTodo {
  title: string;
  checked: boolean;
}

export interface INewTodoFormData {
  title: string;
  titleRules: [TTitleRequiredRule];
  valid: boolean;
}

export interface INewTodoFormHelpers {
  resetForm: () => void;
  resetValidation: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export interface ITodo extends INewTodo {
  id: string;
  deleteLoading: boolean;
}
export interface ITodoFormData extends INewTodoFormData {
  checked: boolean;
}

export interface ITodoFormHelpers {
  disableEdit: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export interface IUseTodosData {
  loading: boolean;
  todos: ITodo[];
}

export interface IUseTodosActions {
  addTodo: (
    formData: INewTodoFormData,
    formHelpers: INewTodoFormHelpers
  ) => Promise<void>;
  deleteTodo: (todo: ITodo) => Promise<void>;
  toggleTodo: (todo: ITodo) => Promise<void>;
  updateTodo: (
    todo: ITodo,
    formData: ITodoFormData,
    formHelpers: ITodoFormHelpers
  ) => Promise<void>;
}

export type TUseTodosReturn = ToRefs<IUseTodosData> & IUseTodosActions;
