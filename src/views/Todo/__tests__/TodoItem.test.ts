import { fireEvent, waitFor } from "@testing-library/vue";
import { render } from "@tests/utils";
import { titleRequiredRule } from "../constants";
import { TodoItem } from "../TodoItem";
import { ITodo, ITodoFormData } from "../types";

const disableEdit = expect.any(Function);
const setSubmitting = expect.any(Function);
const newTitle = "New todo title";
const todo: ITodo = {
  id: "todoId1",
  title: "Todo title",
  checked: false,
  deleteLoading: false,
};
const formData: ITodoFormData = {
  title: newTitle,
  titleRules: [titleRequiredRule],
  valid: true,
  checked: false,
};

const props = {
  todo,
};

describe("TodoItem", () => {
  test("Should properly call toggle checked handler while clicking at checkbox", () => {
    const { getByLabelText, emitted } = render(TodoItem, { props });
    fireEvent.click(getByLabelText("Toggle todo"));

    expect(emitted().toggleTodo).toBeTruthy();
    expect(emitted().toggleTodo[0]).toEqual([todo]);
  });

  test("Should properly call toggle checked handler while clicking at title", () => {
    const { emitted, getByText } = render(TodoItem, { props });
    fireEvent.click(getByText(todo.title));

    expect(emitted().toggleTodo).toBeTruthy();
    expect(emitted().toggleTodo[0]).toEqual([todo]);
  });

  test("Should switch form to editable while clicking edit button", async () => {
    const { getByLabelText, queryByText, getByPlaceholderText } = render(
      TodoItem,
      { props }
    );
    await waitFor(() => fireEvent.click(getByLabelText("Edit todo")));

    expect(queryByText(todo.title)).toBeNull();
    expect(getByPlaceholderText("Type your todo here")).toBeInTheDocument();
  });

  test("Should properly switch form to editable while clicking edit button and focus input", async () => {
    const { getByLabelText, getByPlaceholderText, queryByText } = render(
      TodoItem,
      { props }
    );

    await waitFor(() => fireEvent.click(getByLabelText("Edit todo")));

    expect(queryByText(todo.title)).toBeNull();
    const titleInput = getByPlaceholderText("Type your todo here");
    expect(titleInput).toBeInTheDocument();

    await waitFor(() => expect(titleInput).toHaveFocus());
  });

  test("Should display missing title validation", async () => {
    const {
      container,
      getByLabelText,
      getByPlaceholderText,
      getByText,
      queryByText,
    } = render(TodoItem, { props });
    expect(queryByText("Title is required")).toBeNull();

    await waitFor(() => fireEvent.click(getByLabelText("Edit todo")));

    const titleInput = getByPlaceholderText("Type your todo here");
    await waitFor(() => fireEvent.update(titleInput, ""));

    const submitButton = container.querySelector("button[type=submit]");
    submitButton && fireEvent.click(submitButton);

    expect(getByText("Title is required")).toBeInTheDocument();
  });

  test("Should properly submit updated todo", async () => {
    const {
      container,
      emitted,
      getByLabelText,
      getByPlaceholderText,
      queryByText,
    } = render(TodoItem, { props });
    expect(queryByText("Title is required")).toBeNull();

    await waitFor(() => fireEvent.click(getByLabelText("Edit todo")));

    const titleInput = getByPlaceholderText("Type your todo here");
    await waitFor(() => fireEvent.update(titleInput, newTitle));

    const submitButton = container.querySelector("button[type=submit]");
    submitButton && fireEvent.click(submitButton);

    expect(emitted().updateTodo).toBeTruthy();
    expect(emitted().updateTodo[0]).toEqual([
      todo,
      formData,
      { disableEdit, setSubmitting },
    ]);
  });
});
