import React, { useState } from 'react'
import './todo.css'
export const TodosInput = ({datafn}) => {
    const [text, setText] = useState("");
  return (
    <div className='inputdiv'>
    <input
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        placeholder="Add Todo"
      />
      <button className='submitbtn' onClick={()=>{
      datafn(text)
      }}>Add</button>
    </div>
  )
}
