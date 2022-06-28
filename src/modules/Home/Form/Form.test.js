import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "./Main";

describe("Inputs", () => {
  it("should render input element", async () => {
    render(<Main values={{}} setValues={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/Choose starting point/i);
    expect(inputElement).toBeInTheDocument();
  });
  it("should render input element", async () => {
    render(<Main values={{}} setValues={() => {}} />);
    const inputElement = screen.getByPlaceholderText(
      /Choose destination point/i
    );
    expect(inputElement).toBeInTheDocument();
  });
  it("should be able to type in input", async () => {
    render(<Main values={{}} setValues={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/Choose starting point/i);
    fireEvent.change(inputElement, { target: { value: "Warsaw" } });
    expect(inputElement.value).toBe("Warsaw");
  });
  it("should be able to type in input", async () => {
    render(<Main values={{}} setValues={() => {}} />);
    const inputElement = screen.getByPlaceholderText(
      /Choose destination point/i
    );
    fireEvent.change(inputElement, { target: { value: "Warsaw" } });
    expect(inputElement.value).toBe("Warsaw");
  });
  it("should display error when inputs are not valid", async () => {
    render(
      <Main values={{}} setValues={() => {}} errors={"inputs are not valid"} />
    );
    const button = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText(/Choose starting point/i);
    userEvent.type(inputElement, "a");
    userEvent.click(button);
    const errorElement = screen.queryByText("inputs are not valid", {
      exact: false,
    });
    expect(errorElement).toBeInTheDocument();
  });
  it("should display error when route is not found", async () => {
    render(
      <Main
        values={{}}
        setValues={() => {}}
        errors={"Unable to find a route"}
      />
    );
    const button = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText(/Choose starting point/i);
    const errorElement = screen.queryByText(/Unable to find a route/i);
    userEvent.type(inputElement, "ajsdnfjdks");
    userEvent.click(button);
    expect(errorElement).toBeInTheDocument();
  });
});
