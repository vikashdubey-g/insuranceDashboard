import { render, screen } from "../../utils/test-utils";
import AnalysisResults from "../AnalysisResults";

describe("AnalysisResults Page", () => {
  test("renders placeholder content", () => {
    render(<AnalysisResults />);
    expect(
      screen.getByText(/Analysis Results coming soon/i),
    ).toBeInTheDocument();
  });
});
