import React, { useState } from 'react'

export const TodosInput = ({datafn}) => {
    const [text, setText] = useState("");
  return (
    <div>
    <input
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        placeholder="Add Todo"
      />
      <button onClick={()=>{
      datafn(text)
      }}>Add</button>
    </div>
  )
}
