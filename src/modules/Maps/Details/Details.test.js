import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Details from "./Details";

describe("Checking input", () => {
  it("should render input element", async () => {
    render(<Details />);
    const inputElement = screen.getByPlaceholderText(/Choose starting point/i);
    expect(inputElement).toBeInTheDocument();
  });
});
