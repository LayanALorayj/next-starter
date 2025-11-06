"use client";

import { useEffect, useState } from "react";
import TaskInput from "../components/TaskInput";
import TaskItem from "../components/TaskItem";
import Link from "next/link";

interface Task {
  text: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, { text, done: false }]);
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <Link href="/api-todos" className="btn btn-outline mt-4 w-full mb-4">
          View API Todos
        </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">📝 My To-Do List</h1>
      <TaskInput onAdd={addTask} />
      <div className="mt-4 space-y-2">
        {tasks.map((t, i) => (
          <TaskItem
            key={i}
            task={t.text}
            done={t.done}
            onToggle={() => toggleTask(i)}
            onDelete={() => deleteTask(i)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No tasks yet!</p>
        )}
      </div>
    </main>
  );
}
