import { render } from "@testing-library/vue";
import router from "@/router";
import Home from "../Home.vue";

describe("Home", () => {
  test("Should render welcome heading, subheading and navigation buttons", () => {
    const { getByText } = render(Home, {
      router,
    });
    expect(getByText("Welcome to My Vue Examples.")).toBeInTheDocument();
    expect(
      getByText("Pick a project you want to discover.")
    ).toBeInTheDocument();
    expect(getByText("Go to TODO App")).toBeInTheDocument();
  });
});
