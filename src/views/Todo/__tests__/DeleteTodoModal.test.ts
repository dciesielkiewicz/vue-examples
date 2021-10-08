import { fireEvent, waitFor } from "@testing-library/vue";
import { render } from "@tests/utils";
import { DeleteTodoModal } from "../DeleteTodoModal";
import { ITodo } from "../types";

const todo: ITodo = {
  id: "todoId1",
  title: "Todo 1",
  checked: false,
  deleteLoading: false,
};

const props = {
  todo,
};

describe("DeleteTodoModal", () => {
  test("Should not render closed modal", () => {
    const { queryByText } = render(DeleteTodoModal, { props });
    expect(queryByText("Delete Todo")).toBeNull();
  });

  test("Should render modal and todo", async () => {
    const { getByLabelText, getByText } = render(DeleteTodoModal, { props });
    await waitFor(() => fireEvent.click(getByLabelText("Delete todo button")));
    expect(getByText("Delete Todo")).toBeInTheDocument();
    expect(
      getByText(`Are you sure you want to delete todo: ${todo.title}?`)
    ).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });

  test("Should properly trigger delete action", async () => {
    const { emitted, getByLabelText, getByText } = render(DeleteTodoModal, {
      props,
    });
    await waitFor(() => fireEvent.click(getByLabelText("Delete todo button")));
    await waitFor(() => fireEvent.click(getByText("Delete")));
    expect(emitted().deleteTodo).toBeTruthy();
  });
});
