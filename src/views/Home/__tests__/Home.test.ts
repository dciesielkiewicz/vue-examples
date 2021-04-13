import { render } from "@tests/utils";
import Home from "../Home.vue";

describe("Home", () => {
  test("Should render welcome heading, subheading and navigation buttons", () => {
    const { getByText } = render(Home);
    expect(getByText("Welcome to My Vue Examples.")).toBeInTheDocument();
    expect(
      getByText("Pick a project you want to discover.")
    ).toBeInTheDocument();
    expect(getByText("Go to TODO App")).toBeInTheDocument();
  });
});
