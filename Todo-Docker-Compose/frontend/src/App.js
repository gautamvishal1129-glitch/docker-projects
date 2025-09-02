import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);


  // ✅ Use environment variable or default to localhost
  const API_BASE =
    process.env.REACT_APP_API_URL || "http://localhost:3000"; // ✅ UPDATED

  // Fetch todos
  useEffect(() => {
    fetch(`${API_BASE}/list`)   // ✅ UPDATED
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTask = async () => {
    await fetch(`${API_BASE}/add`, {   // ✅ UPDATED
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    setTask("");
    const data = await fetch(`${API_BASE}/list`).then((res) =>
      res.json()
    );
    setTodos(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Docker Todo App</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
