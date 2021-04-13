import { render } from "@tests/utils";
import Layout from "../Layout.vue";

const children = "children";

describe("Layout", () => {
  test("Should render children", () => {
    const { getByText } = render(Layout, {
      slots: {
        default: children,
      },
    });
    expect(getByText(children)).toBeInTheDocument();
  });
});
