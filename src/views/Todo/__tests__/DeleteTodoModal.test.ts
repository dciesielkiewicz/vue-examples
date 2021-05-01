import { fireEvent } from "@testing-library/vue";
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
    const { queryByText } = render(DeleteTodoModal);
    expect(queryByText("Delete Todo")).toBeNull();
  });

  test("Should render modal and todo", () => {
    const { getByText } = render(DeleteTodoModal, { props });
    expect(getByText("Delete Todo")).toBeInTheDocument();
    expect(
      getByText(`Are you sure you want to delete todo: ${todo.title}?`)
    ).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });

  test("Should properly close modal", () => {
    const { emitted, getByText } = render(DeleteTodoModal, {
      props,
    });
    fireEvent.click(getByText("Cancel"));
    expect(emitted().closeDeleteModal).toBeTruthy();
  });

  test("Should properly trigger delete action", () => {
    const { emitted, getByText } = render(DeleteTodoModal, { props });
    fireEvent.click(getByText("Delete"));
    expect(emitted().deleteTodo).toBeTruthy();
    expect(emitted().deleteTodo[0]).toEqual([todo]);
  });
});
