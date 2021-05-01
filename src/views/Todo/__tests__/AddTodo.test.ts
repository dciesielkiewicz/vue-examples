import { fireEvent, waitFor } from "@testing-library/vue";
import { render } from "@tests/utils";
import { AddTodo } from "../AddTodo";
import { titleRequiredRule } from "../constants";
import { INewTodoFormData } from "../types";

const resetForm = expect.any(Function);
const resetValidation = expect.any(Function);
const setSubmitting = expect.any(Function);
const newTitle = "New todo title";
const formData: INewTodoFormData = {
  title: newTitle,
  titleRules: [titleRequiredRule],
  valid: true,
};

describe("AddTodo", () => {
  test("Should properly focus on title input", async () => {
    const { getByLabelText, getByPlaceholderText } = render(AddTodo);
    const titleInput = getByPlaceholderText("Type your next todo");
    expect(titleInput).not.toHaveFocus();

    await waitFor(() =>
      fireEvent.click(getByLabelText("Focus add todo input"))
    );
    expect(titleInput).toHaveFocus();
  });

  test("Should display missing title validation", async () => {
    const { container, getByText, queryByText } = render(AddTodo);
    expect(queryByText("Title is required")).toBeNull();

    const submitButton = container.querySelector("button[type=submit]");
    await waitFor(() => submitButton && fireEvent.click(submitButton));

    expect(getByText("Title is required")).toBeInTheDocument();
  });

  test("Should properly submit new todo", async () => {
    const { container, emitted, getByPlaceholderText } = render(AddTodo);
    const titleInput = getByPlaceholderText("Type your next todo");

    await waitFor(() => fireEvent.update(titleInput, formData.title));

    const submitButton = container.querySelector("button[type=submit]");
    submitButton && fireEvent.click(submitButton);

    expect(emitted().addTodo).toBeTruthy();
    expect(emitted().addTodo[0]).toEqual([
      formData,
      { resetForm, resetValidation, setSubmitting },
    ]);
  });
});
