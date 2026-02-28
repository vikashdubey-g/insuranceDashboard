import { render, screen } from "../../utils/test-utils";
import ContractVault from "../ContractVault";

describe("ContractVault Page", () => {
  test("renders placeholder content", () => {
    render(<ContractVault />);
    expect(
      screen.getByText(/Contract Vault is under construction/i),
    ).toBeInTheDocument();
  });
});
