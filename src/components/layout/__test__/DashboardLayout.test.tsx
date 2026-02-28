import { render, screen } from "../../../utils/test-utils";
import { DashboardLayout } from "../DashboardLayout";

describe("DashboardLayout Component", () => {
  test("renders children and layout components", () => {
    render(
      <DashboardLayout>
        <div data-testid="test-child">Main Content</div>
      </DashboardLayout>,
    );
    expect(screen.getByTestId("test-child")).toBeInTheDocument();

    // Check if Sidebar is rendered implicitly
    expect(screen.getByText("LegalGraph AI")).toBeInTheDocument();
  });
});
