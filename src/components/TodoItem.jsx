import React from 'react'
import { nanoid } from 'nanoid';
import "./todo.css"
export const TodoItem = ({todo,handleStatus,removetodo}) => {
  return (
    <div className='tododiv'>
    <div>
    {todo.todo} 
    </div>
    <div>
    {todo.status ? "Completed" : "Pending"}
     </div>
     <div>
     <button className='btn' onClick={()=>{
     handleStatus(todo)
     }} style={{marginLeft:"10px"}}>Toggle</button>
     </div>
     <div> 
     <button className='btn' onClick={()=>{removetodo(todo._id)}}>Remove</button>
     </div>
        </div>
  )
}
