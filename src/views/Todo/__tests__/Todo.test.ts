import { render } from "@testing-library/vue";
import Todo from "../Todo.vue";

test("Should render Todo heading", () => {
  const { getByText } = render(Todo, {
    stubs: ["TodoList"],
  });
  expect(getByText("Todo list")).toBeInTheDocument();
});
