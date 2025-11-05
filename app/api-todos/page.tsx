
export default async function ApiTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const todos = await res.json();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🌐 Todos from API
      </h1>

      <div className="space-y-3">
        {todos.map((todo: any) => (
          <div
            key={todo.id}
            className={`p-4 rounded-lg border ${
              todo.completed
                ? "bg-green-400 border-green-300"
                : "bg-yellow-400 border-yellow-300"
            }`}
          >
            <p className="font-medium">{todo.title}</p>
            <p className="text-sm text-gray-600">
              Status: {todo.completed ? " Done" : " Pending ⏳"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
