import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "../components/TaskInput";

describe("TaskInput Component", () => {
  it("renders input and button", () => {
    render(<TaskInput onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("Add a new task...")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("calls onAdd when submitting a task", () => {
    const mockAdd = vi.fn();
    render(<TaskInput onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText("Add a new task...");
    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.submit(input.closest("form")!);

    expect(mockAdd).toHaveBeenCalledWith("Test Task");
  });
});
