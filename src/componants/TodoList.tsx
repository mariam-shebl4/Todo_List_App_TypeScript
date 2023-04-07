import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from 'react-beautiful-dnd';
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completed: Todo[];
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ setTodos, todos ,setCompleted,completed}) => {
  return (
    <div className=" flex justify-between items-start mt-3 md:flex-row flex-col w-[95%]">

      <Droppable droppableId="TodosList">
       
       {
       (provided,snapshot)=>(

      <div  className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">Active Tasks</span>
        {todos?.map((t, index) => (
        <SingleTodo t={t} key={t.id} todos={todos} setTodos={setTodos} index={index}/>
      ))}
      {provided.placeholder}
      </div>
       ) }
      </Droppable> 

       <Droppable droppableId="TodosRemove">
        {
          (provided,snapshot)=>( 

      <div  className={`todos  ${
        snapshot.isDraggingOver ? "dragcomplete" : "remove"
      }`} ref={provided.innerRef} {...provided.droppableProps} >
        <span className="todos__heading">Completed Tasks</span>
        {completed?.map((t, index) => (
        <SingleTodo t={t} key={t.id} todos={completed} setTodos={setCompleted} index={index} />
      ))}
      {provided.placeholder}
      </div>
         )}
      </Droppable> 
    
    </div>
  
  );
};

export default TodoList;
