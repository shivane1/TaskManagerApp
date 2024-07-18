import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import Footer from './components/Footer'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
let string =localStorage.getItem("todos")
if(string)
{
  let todos=JSON.parse(localStorage.getItem("todos"))
  settodos(todos)
}
}, [])
  //save to local storage
  const savels= () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

const hidefinished=(e) => {
  setshowfinished(!showfinished)
}


  const handleedit = (e, id) => {
    let t = todos.find(item => item.id === id);
    settodo(t.todo);
    let newtodos=todos.filter(item=>{
      return item.id!=id
    })
    settodos(newtodos)
    savels()
  };

  const handledelete=(e,id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!=id
    })
    settodos(newtodos)
    savels()
  }
  const handleadd=()=>{
    if(todo)
    {
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    }
    settodo("")
    console.log(todos)
    savels()
  }

  const handlechange=(e)=>{
    settodo(e.target.value)
    savels()
  }

  const handlecheckbox =(e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
return item.id === id
    })
    let newtodos=[...todos]               //so that rerender can happen
newtodos[index].isCompleted=!newtodos[index].isCompleted
settodos(newtodos)
savels()
  }

  
  return (
    <>
      <Navbar/>
      <div className=" my-6 rounded-xl  bg-green-700 p-5 min-h-[87vh] md:w-1/2 mx-auto"> {/* after md */} 
        <div>
          <h1 className='h1 font-bold my-7 text-center text-xl' >TaskPlanner- Manage Your Task At one place </h1>
        <h2 className="addtodo font-bold  mx-6">Add a Task </h2>
        <input type="text" className="inp w-full bg-gray-500 rounded-lg p-2 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md" onChange={handlechange} value={todo}/>

        <div className='flex justify-center items-center'>
        <button className='Add bg-blue-500 hover:bg-blue-700 p-1 mx-6 font-bold rounded-md w-full my-6' onClick={handleadd}>Save</button>
        </div>
        </div>
        <input type="checkbox" checked={showfinished} onClick={hidefinished}  className=" text-green-500 border-2 border-black rounded focus:ring-0 accent-green-200 hover:cursor-pointer" /> <span className='font-bold'>Show Finished</span>
<div className='h-[1px] bg-black opacity-20'></div>
  <h2 className="font-semibold text-xl mx-6 text-slate-800">Your's Task</h2>
  <div className="todes">
    {todos.length==0 && <div className='font-bold mx-auto my-10 text-xl '>Your task list is empty </div>}
    {todos.map(item=>{

      return(showfinished || !item.isCompleted) &&
    <div key={item.id}>  
     <div className="todo flex justify-between items-center my-4 ">
     <div className='flex gap-6 'style={{ maxWidth: '40%' }}>
      <input type="checkbox" name={item.id} checked={item.isCompleted} onClick={handlecheckbox}
       className="h-full w-full text-green-500 border-2 border-black rounded focus:ring-0 accent-green-200 hover:cursor-pointer"
      />              
        {/* by select this isCompleted (true) */}
        <div className='w-full'>
        <div className={item.isCompleted ? "line-through" : "font-semibold"} style={{ minWidth: '32vw', wordWrap: 'break-word'}}>{item.todo}</div>

      </div>
      </div>
      <div className="buttons flex h-full">
<button className="edit bg-blue-500 hover:bg-blue-700 p-2 mx-2 font-bold rounded-md" onClick={(e)=>handleedit(e,item.id)}><FaEdit /></button>
<button className="del bg-blue-500 hover:bg-blue-700 p-2  mx-2 font-bold rounded-md" onClick={(e)=>handledelete(e,item.id)}><FaDeleteLeft /></button>
      </div>
    </div>
    </div>
    }
    )}
    <Footer/>
  </div>
      </div>
    </>
  )
}
export default App
