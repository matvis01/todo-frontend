import { useState, useEffect } from "react"
import axios from "axios"
import TodoType from "./types/TodoType"
import Todo from "./components/Todo"

function App() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [newTodo, setNewTodo] = useState("")
  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axios.get("http://localhost:5000/todos")
        setTodos(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTodos()
  }, [])

  async function addTodo() {
    if (!newTodo) return
    const todo = { title: newTodo, isCompleted: false }
    try {
      const res = await axios.post("http://localhost:5000/todos", todo)
      setTodos([...todos, res.data])
      setNewTodo("")
    } catch (err) {
      console.error(err)
    }
  }

  async function removeTodo(id: number) {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center p-2 sm:py-20">
      <div className="container flex  flex-col mx-auto bg-gray-bg-gray-300 max-w-screen-sm border-orange-700 border-8 rounded-2xl p-4 gap-2">
        <h1 className="text-3xl font-bold text-center">Todos</h1>
        <div className="flex items-center w-full gap-2">
          <input
            type="text"
            placeholder="Add a new todo"
            className="p-2 flex-1 border-2 border-orange-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-700"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-xl text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none transition-transform transform active:scale-95"
          >
            Add
          </button>
        </div>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={{ ...todo }}
            removeTodo={(id: number) => {
              removeTodo(id)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
