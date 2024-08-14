import React, { useState } from "react"
import TodoType from "../types/TodoType"
import axios from "axios"

type TodoProps = {
  todo: TodoType
  removeTodo: (id: number) => void
}

export default function Todo(props: TodoProps) {
  const { _id, title, isCompleted } = props.todo
  const [checked, setChecked] = useState(isCompleted)

  async function changeChecked() {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${_id}`, {
        title,
        isCompleted: !checked,
      })
      setChecked(res.data.isCompleted)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center p-2 border-2 border-orange-700 rounded-2xl gap-2">
      <div className="relative flex items-center justify-center">
        <input
          id={"input" + _id.toString()}
          type="checkbox"
          checked={checked}
          onChange={changeChecked}
          className={`appearance-none h-6 w-6 border-2 rounded-md cursor-pointer ${
            checked ? "bg-orange-700 border-orange-700" : "border-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-orange-700`}
        />
        {checked && (
          <svg
            className="absolute inset-0 w-4 h-4 m-auto text-white pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <label
        htmlFor={"input" + _id.toString()}
        className={`ml-2 text-gray-700 select-none cursor-pointer ${
          checked ? "line-through text-gray-400" : ""
        }`}
      >
        {title}
      </label>

      <button
        onClick={(_id) => {
          props.removeTodo(props.todo._id)
        }}
        className="ml-auto px-4 py-2 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none transition-transform transform active:scale-95"
      >
        Remove
      </button>
    </div>
  )
}
