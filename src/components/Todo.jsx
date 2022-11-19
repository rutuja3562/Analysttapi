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
    axios.post("http://localhost:7005/todos",payload).then((res)=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e)
    })
    fetchTodos();
    // setTodolist([...todolist, payload]);
  };

  const handleStatus =async(todo) => {
  console.log(todo,todo._id,!todo.status)

const payload = {
  status: !todo.status,
};
axios.patch(`http://localhost:7005/todos/${todo._id}`,payload).then((res)=>{
  console.log(res)
  fetchTodos();
}).catch((e)=>{
  console.log(e)
})
};

  const removetodo = (id) => {
  axios.delete(`http://localhost:7005/todos/${id}`).then((res)=>{
    // console.log(res)
    // setTodolist(res.data)
    fetchTodos()
  }).catch((e)=>{
    console.log(e)
  })
  };
  useEffect(()=>{
    // if(todolist.length==0){
    fetchTodos();
    // }
  },[])
  const fetchTodos=async()=>{
  axios.get("http://localhost:7005/todos").then((res)=>{
    console.log(res)
    setTodolist(res.data)
  }).catch((e)=>{
    console.log(e)
  })

  }
  const fetchTodo=async(todo)=>{
    axios.get(`http://localhost:7005/todos/${todo._id}`).then((res)=>{
      console.log(res.data)
      // setTodolist(res.data)
    }).catch((e)=>{
      console.log(e)
    })
  
    }
  // `http://localhost:7005/todos/${todo._id}`
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
