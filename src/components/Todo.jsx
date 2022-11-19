import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodosInput } from "./TodosInput";

export const Todo = () => {
  const [todolist, setTodolist] = useState([]);
  const postData = (todos) => {
  
    const payload = {
      todo: todos,
    };
    axios.post("https://analystt-api.herokuapp.com/todos",payload).then((res)=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e)
    })
    fetchTodos();
  };

  const handleStatus =async(todo) => {
  console.log(todo,todo._id,!todo.status)

const payload = {
  status: !todo.status,
};
axios.patch(`https://analystt-api.herokuapp.com/${todo._id}`,payload).then((res)=>{
  console.log(res)
  fetchTodos();
}).catch((e)=>{
  console.log(e)
})
};

  const removetodo = (id) => {
  axios.delete(`https://analystt-api.herokuapp.com/${id}`).then((res)=>{
    fetchTodos()
  }).catch((e)=>{
    console.log(e)
  })
  };
  useEffect(()=>{
    fetchTodos();
  },[])
  const fetchTodos=async()=>{
  axios.get("https://analystt-api.herokuapp.com").then((res)=>{
    console.log(res)
    setTodolist(res.data)
  }).catch((e)=>{
    console.log(e)
  })

  }
  const fetchTodo=async(todo)=>{
    axios.get(`https://analystt-api.herokuapp.com/${todo._id}`).then((res)=>{
      console.log(res.data)
      // setTodolist(res.data)
    }).catch((e)=>{
      console.log(e)
    })
  
    }

  return (
    <div>
      <TodosInput datafn={postData} />
      <div>
        {todolist.map((e,i) => {
          return (
            <div key={i}>
              <TodoItem
                handleStatus={handleStatus}
                removetodo={removetodo}
                fetchTodo={fetchTodo}
                todo={e}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
