"use client";

interface TaskItemProps {
  task: string;
  done: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, done, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between bg-base-100 p-3 rounded-lg shadow-sm">
      <div
        onClick={onToggle}
        className={`cursor-pointer ${done ? "line-through opacity-60" : ""}`}
      >
        {task}
      </div>
      <button onClick={onDelete} className="btn btn-xs btn-error">
        ✕
      </button>
    </div>
  );
}
