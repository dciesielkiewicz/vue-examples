import { render } from "@tests/utils";
import Loader from "../Loader.vue";

describe("Loader", () => {
  test("Should render loading icon", () => {
    const { getByTestId } = render(Loader);
    expect(getByTestId("loading-icon")).toBeInTheDocument();
  });
});
