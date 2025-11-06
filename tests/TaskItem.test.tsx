import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../components/TaskItem";

describe("TaskItem Component", () => {
  it("renders the task text correctly", () => {
    render(
      <TaskItem task="Learn Next.js" done={false} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByText("Learn Next.js")).toBeInTheDocument();
  });

  it("applies line-through when done is true", () => {
    render(
      <TaskItem task="Completed task" done={true} onToggle={() => {}} onDelete={() => {}} />
    );
    const taskElement = screen.getByText("Completed task");
    expect(taskElement).toHaveClass("line-through");
  });

  it("calls onToggle when clicking the task text", () => {
    const mockToggle = vi.fn();
    render(
      <TaskItem task="Clickable task" done={false} onToggle={mockToggle} onDelete={() => {}} />
    );

    const taskElement = screen.getByText("Clickable task");
    fireEvent.click(taskElement);

    expect(mockToggle).toHaveBeenCalled();
  });

  it("calls onDelete when clicking the delete button", () => {
    const mockDelete = vi.fn();
    render(
      <TaskItem task="Deletable task" done={false} onToggle={() => {}} onDelete={mockDelete} />
    );

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalled();
  });
});
