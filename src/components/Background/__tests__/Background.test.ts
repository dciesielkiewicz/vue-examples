import { render } from "@tests/utils";
import Background from "../Background.vue";

const children = "children";

describe("Background", () => {
  test("Should render properly styled background", () => {
    const { getByTestId, getByText } = render(Background, {
      slots: {
        default: children,
      },
    });
    expect(getByTestId("background")).toHaveClass("background");
    expect(getByText(children)).toBeDefined();
  });
});
