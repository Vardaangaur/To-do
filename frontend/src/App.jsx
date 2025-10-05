import React, { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose, IoClipboardOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Add new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post("/api/todos", { task: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error in adding todo", error);
    }
  };

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.log("Error in fetching todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Start editing
  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.task);
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      const res = await axios.patch(`/api/todos/${id}`, { task: editedText });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error in saving edit");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error in deleting todo");
    }
  };

  // Toggle completed
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const res = await axios.patch(`/api/todos/${id}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.log("Error in toggling todo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-gray-200 relative">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">Task Manager</h1>
          <p className="text-gray-500 mt-1">Organize your tasks in style</p>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 shadow-inner hover:bg-gray-100 transition-all duration-300"
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            required
            className="flex-1 bg-transparent outline-none px-3 py-2 placeholder-gray-400 text-gray-700 rounded-full transition-all duration-300"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-2 rounded-full shadow-lg transform hover:scale-105 hover:ring-2 hover:ring-blue-200 transition-all duration-300">
            Add
          </button>
        </form>

        {/* Todos */}
        <div className="mt-6 space-y-4">
          {todos.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <IoClipboardOutline className="mx-auto text-7xl mb-3 animate-bounce text-gray-400" />
              No Tasks Yet!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {editingTodo === todo._id ? (
                  <div className="flex items-center flex-1 gap-3">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 shadow-inner transition-all duration-300"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(todo._id)}
                        className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow hover:shadow-md hover:ring-2 hover:ring-green-200 transition-all duration-300"
                      >
                        <MdOutlineDone size={20} />
                      </button>
                      <button
                        onClick={() => setEditingTodo(null)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl shadow transition-all duration-300"
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTodo(todo._id)}
                        className={`h-6 w-6 border rounded-full flex items-center justify-center transition-all duration-300 ${
                          todo.completed
                            ? "bg-green-500 text-white hover:ring-2 hover:ring-green-200"
                            : "bg-gray-100 border-gray-300 hover:border-blue-400 hover:ring-2 hover:ring-blue-200"
                        }`}
                      >
                        {todo.completed && <MdOutlineDone />}
                      </button>
                      <span
                        className={`text-gray-800 font-medium truncate transition-all duration-300 ${
                          todo.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.task}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(todo)}
                        className="p-2 hover:bg-blue-50 rounded-xl shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-200 transition-all duration-300"
                      >
                        <MdModeEditOutline className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => deleteTask(todo._id)}
                        className="p-2 hover:bg-red-50 rounded-xl shadow-sm hover:shadow-md hover:ring-2 hover:ring-red-200 transition-all duration-300"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
