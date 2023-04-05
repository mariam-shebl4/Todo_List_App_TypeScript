import React, {useState} from 'react';
import './App.css';
import InputFeild from './componants/InputFeild';
import TodoList from './componants/TodoList';
import { Todo } from './model';
import {DragDropContext, DropResult } from 'react-beautiful-dnd'


const App: React.FC =()=> {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  //for completed todos

  const [completed, setCompleted] = useState<Todo[]>([])




  const handleAdd=(e:React.FormEvent)=>{
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id:Date.now(), todo, isDone:false}])
      setTodo("")
    }
}

const onDragEnd=(result: DropResult)=>{
  // console.log(result);
  
  const {source, destination}= result;

  if (!destination) {return};

  if(
    destination.droppableId=== source.droppableId &&
    destination.index===source.index
  )
{  return;}

  let add,
  active=todos,
  complete= completed;
//source logic
  if(source.droppableId==='TodosList'){
    add= active[source.index]
    active.splice(source.index, 1)
  }
  else{
    add= complete[source.index]
    complete.splice(source.index, 1)
  }

//destination logic
  if(destination.droppableId==='TodosList'){
    active.splice(destination.index, 0, add)
  }
  else{
    
    complete.splice(destination.index, 0, add)
  }
   setCompleted(complete);
   setTodos(active)
}
  // console.log(todos);
  
  return (
    <DragDropContext onDragEnd={onDragEnd} >
    <div className="App  bg-gradient-to-r from-[#101A3B] to-blue-950">
      <h2 className="heading">Task of the day</h2>
      <InputFeild todo={todo}  setTodo={setTodo} handleAdd={handleAdd}/> 
      <TodoList  todos={todos} setTodos={setTodos} completed={completed} setCompleted={setCompleted} />
    </div>
     </DragDropContext>
  );
}

export default App;
