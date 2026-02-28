import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button Component", () => {
  test("renders with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    // Default variant is primary
    expect(button).toHaveClass("bg-[#4A88EE]");
  });

  test("renders correctly when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-70");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByRole("button", { name: /clickable/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("displays loading state properly", () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole("button", { name: /loading/i });
    expect(button).toBeDisabled();
    // The bouncing dots container uses the space-x-1 class
    const loaderContainer = button.querySelector(".space-x-1");
    expect(loaderContainer).toBeInTheDocument();
  });
});
