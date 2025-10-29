import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import TextType from './components/TextTyppe';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const [errorMessage, setErrorMessage] = useState("")
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    const newTodos = [{ id: uuidv4(), todo, iscCompleted: false }, ...todos]
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setTodo("")
    setErrorMessage("")
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?")
    if (!confirmed) return

    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].iscCompleted = !newTodos[index].iscCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container bg-gray-400 mt-5 md:w-[70vw] min-h-[85vh] flex flex-col items-center mx-auto rounded-md">
        <TextType className='font-bold text-xl bg-black text-white w-full text-center rounded-t-md select-none' text={["iTask - Manage your tasks at once", "for your daily usage"]} typingSpeed={75} pauseDuration={1500} showCursor={true} cursorCharacter="|" />
        <h2 className='text-black font-bold my-4 select-none'>Add Todo</h2>
        <div className="addTodo flex gap-2 pb-5 w-full justify-center">
          <input onChange={handleChange} value={todo} className="inputTodo bg-white select-none rounded-sm w-[55%] pl-3" type="text" placeholder='Add Your todo ' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='font-bold cursor-pointer bg-[#000000] text-white px-2 py-1 rounded-sm select-none flex items-center gap-2'>Save <FaSave /></button>
        </div>
        <div className='errorText text-[red]'>{errorMessage}</div>
        <div className="checkFinished flex gap-2 select-none">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
          Show Finished Todos
        </div>
        <h2 className='text-black font-bold mt-2 border-solid border-t-2 border-[#ffffff] w-full flex justify-center underline select-none'>Your Todos</h2>
        <div className="todos md:w-[60%] ">
          {todos.length === 0 && <div className='flex justify-center text-[#00000068] items-center mt-[10vh] select-none'>No Todos To Display</div>}
          {todos.map(item => {
            return (showFinished || !item.iscCompleted) && <div key={item.id} className="todo flex justify-between bg-gray-400 hover:bg-gray-500 p-3 py-1 rounded-md items-start font-medium">
              <div className={item.iscCompleted ? "line-through flex gap-3 flex-1 min-w-0" : "flex gap-3 flex-1 min-w-0"}>
                <input name={item.id} onChange={handleCheckbox} className='flex-none' type="checkbox" checked={item.iscCompleted} />
                <div className="text flex-1 max-w-[250px] md:max-w-[30vw] break-all  ">{item.todo} </div>
              </div>
              <div className="todoBtns flex gap-2 md:flex-row flex-col ">
                <button onClick={(e) => handleEdit(e, item.id)} className='font-bold cursor-pointer bg-[#000000] text-white px-3 py-1.5 rounded-sm flex items-center gap-2'> <MdEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='font-bold cursor-pointer bg-[#000000] text-white px-3 py-1.5 rounded-sm flex items-center gap-2'> <MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
