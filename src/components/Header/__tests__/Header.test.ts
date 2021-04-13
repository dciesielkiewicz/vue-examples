import { fireEvent, waitFor } from "@testing-library/vue";
import { render } from "@tests/utils";
import Header from "../Header.vue";

describe("Header", () => {
  test("Should render toggle menu button", () => {
    const { getByLabelText } = render(Header);
    expect(getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  test("Should properly open and close navigation", async () => {
    const { getByLabelText, getByText } = render(Header);
    expect(getByLabelText("Navigation menu")).toHaveClass(
      "v-navigation-drawer--close"
    );

    await waitFor(() => fireEvent.click(getByLabelText("Toggle menu")));
    expect(getByLabelText("Navigation menu")).not.toHaveClass(
      "v-navigation-drawer--close"
    );

    await waitFor(() => fireEvent.click(getByText("Home")));
    expect(getByLabelText("Navigation menu")).toHaveClass(
      "v-navigation-drawer--close"
    );
  });
});
