import { render, screen } from "../../utils/test-utils";
import Settings from "../Settings";

describe("Settings Page", () => {
  test("renders page content and inputs", () => {
    render(<Settings />);
    expect(screen.getByText("General Settings")).toBeInTheDocument();

    // Check if input fields render
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Notifications/i)).toBeInTheDocument();
  });
});
