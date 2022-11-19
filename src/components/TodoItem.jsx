import React from 'react'
import { nanoid } from 'nanoid'
export const TodoItem = ({todo,handleStatus,removetodo,fetchTodo}) => {
  return (
    <div style={{marginBottom:"10px"}}>
    {todo.todo} : {todo.status ? "Completed" : "Pending"}
    <button onClick={()=>{
    handleStatus(todo)
    }} style={{marginLeft:"10px"}}>Toggle</button>
    <button onClick={()=>{removetodo(todo._id)}}>Remove</button>
    <button onClick={()=>{fetchTodo(todo)}}>ll</button>
     
    </div>
  )
}
