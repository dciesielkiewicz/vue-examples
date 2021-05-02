import moxios from "moxios";
import { waitFor } from "@testing-library/vue";
import { render } from "@tests/utils";
import { ITodo } from "../types";
import { TodoList } from "../TodoList";

const todo1: ITodo = {
  id: "todoId1",
  title: "Title 1",
  checked: false,
  deleteLoading: false,
};
const todo2: ITodo = {
  id: "todoId2",
  title: "Title 2",
  checked: false,
  deleteLoading: false,
};
const todos: ITodo[] = [todo1, todo2];

describe("TodoList", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Should render Todo list", async () => {
    moxios.stubRequest("/todos", {
      status: 200,
      response: todos,
    });

    const { getByText } = render(TodoList);
    await waitFor(() => {
      expect(getByText(todo1.title)).toBeInTheDocument();
      expect(getByText(todo2.title)).toBeInTheDocument();
    });
  });
});
