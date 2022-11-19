import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodosInput } from "./TodosInput";
import './todo.css'
export const Todo = () => {
  const [todolist, setTodolist] = useState([]);
  const [pending, setPending]=useState([])
  const [completed,setCompleted]=useState([])
const [completedTodo,setCompletedTodo]=useState('l');
// const [pendingTodo, setPendingTodo]=useState(false)
const postData = (todos) => {
    const payload = {
      todo: todos,
    };
    axios.post("https://analystt-api.herokuapp.com/todos",payload).then((res)=>{
    }).catch((e)=>{
      console.log(e)
    })
    fetchTodos();
  };

  const handleStatus =async(todo) => {
  const payload = {
  status: !todo.status,
  };
axios.patch(`https://analystt-api.herokuapp.com/todos/${todo._id}`,payload).then((res)=>{
  fetchTodos();
}).catch((e)=>{
  console.log(e)
})
};

const removetodo = (id) => {
  axios.delete(`https://analystt-api.herokuapp.com/todos/${id}`).then((res)=>{
    fetchTodos()
  }).catch((e)=>{
    console.log(e)
  })
};
  
useEffect(()=>{
    fetchTodos({completedTodo});
},[])

const fetchTodos=async()=>{
  axios({
    url:"https://analystt-api.herokuapp.com/todos",
    method:"get",
  }).then((res)=>{
  setTodolist(res.data)
  }).catch((e)=>{
    console.log(e)
  })
  }
  
useEffect(()=>{
  axios.get(
    `https://analystt-api.herokuapp.com/todos?search=true`
    ).then((res)=>{
    setCompleted(res.data)
  }).catch((e)=>{
    console.log(e)
})

},[])
useEffect(()=>{
  axios.get(
    `https://analystt-api.herokuapp.com/todos?search=false`
    ).then((res)=>{
    setPending(res.data)
  }).catch((e)=>{
    console.log(e)
})

},[])
const completedTodos=()=>{
  setCompletedTodo(true);
}
const pendingTodos=()=>{
  setCompletedTodo(false)
}
const allTodos=()=>{
  setCompletedTodo('l')
}
var data;
// {completedTodo ==true ? data=completed ?completedTodo ==false ? data = pending : data = todolist}
if(completedTodo ==true){
  data=completed;

}else if(completedTodo==false){
  data=pending

}else if(completedTodo=='l'){
  data=todolist
}
  return (
    <div>
      <TodosInput datafn={postData} />
      <div>
      <button className="status-btn" onClick={allTodos}>All : {todolist.length}</button>
      <button className="status-btn" onClick={completedTodos}>Completed : {completed.length}</button>
      <button className="status-btn" onClick={pendingTodos}>Pending : {pending.length}</button>
        {data.map((e,i) => {
          return (
            <div key={i} className='todo'>
              <TodoItem
                handleStatus={handleStatus}
                removetodo={removetodo}
                todo={e}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
