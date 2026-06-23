import {useState,useEffect} from "react"

export default function App(){

  const [task, setTask] = useState("");
  const [todos, setTodos]= useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  const addTask = () => {
    setTodos([...todos, 
      {
        text: task,
        completed: false
      }]);
    setTask("");
  };

  const deleteTask = (indexToDelete) => {
    const updatedTodos = todos.filter(
      (_,index)=> index !== indexToDelete
    )
    setTodos(updatedTodos);
  }

  const toggleComplete =(index) =>{
    const updatedTodos=[...todos];

    updatedTodos[index].completed = !updatedTodos[index].completed;

    setTodos(updatedTodos);
  }

  return(
    <div className="container">
      <h1>My Todo App</h1>


      <div className="input-section">
        <input type="text" value={task} onChange={(e)=> setTask(e.target.value)} placeholder="Enter a task..." />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo,index) => (
          <li key={index} className="todo-item">
            {/* <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>
              {todo.text}
            </span> */}
            <span className={todo.completed? "completed" : ""}>{todo.text}</span>
            <div className="actions">
              <button onClick={()=>toggleComplete(index)}>✔</button>
              <button onClick={()=>deleteTask(index)}>✖</button>
            </div>
          </li>
        ))}

      </ul>

      <h3>Total Tasks : {todos.length}</h3>

    </div>
  )
}