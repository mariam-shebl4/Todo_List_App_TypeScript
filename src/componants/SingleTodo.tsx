import React, { useState, useRef ,useEffect} from "react";
import { Todo } from "../model";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';
type Props = {
  index:number;
  t: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index,setTodos, todos, t }: Props) => {
    //edit single task
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(t.todo);
  
  const handleEdit=(e:React.FormEvent, id:number)=>{
      e.preventDefault();
      
      setTodos(todos.map((todo)=>(todo.id === id ? {...t, todo:editTodo}: todo)))
      setEdit(false)
  }

  //to make focuse on the input
  const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus();
}, [edit])

  //handle delete function
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //handle Done function
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  

  return (
    <Draggable draggableId={t.id.toString()} index={index}>
        {
            (provided,snapshot)=>(
    <form className="bg-slate-200 opacity-95  flex flex-row rounded-md p-[20px] mt-[10px] transition-all" onSubmit={(e)=>handleEdit(e, t.id)}  ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps} >
      {edit ? (
          <input
          ref={inputRef}
          className="todos__single--text"
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : t.isDone ? (
        <s className="todos__single--text">{t.todo}</s>
      ) : (
        <span className="todos__single--text">{t.todo}</span>
      )}

      <div className="flex mt-2">
        <span
          className="icon"
          onClick={() => {
            if (!edit && !t.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiOutlineEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(t.id)}>
          <AiOutlineDelete />
        </span>
        <span className="icon" onClick={() => handleDone(t.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
            )
        }

    </Draggable>
  );
};

export default SingleTodo;
