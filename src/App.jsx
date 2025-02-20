import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // "Do Homework"
  // "House chore"
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  }

  const addTask = () => {
    const newTodoList = [...todoList, newTask];
    setTodoList(newTodoList);
  }

  useEffect(()=>{
    axios.get("https://fwhnu5yop2.execute-api.ap-southeast-2.amazonaws.com/")
    .then((response)=> {setData(response.data.data)})
    .catch((error) => console.error(error))
  }, [])

  console.log(data)

  return (
    <div className='App'>
      <div className='addTask'>
        <input onChange={handleChange}/>
        <button onClick={addTask}>Add Task</button>
      </div>
      {newTask}
      <div className='list'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th> 
              <th>Product Price</th> 
              <th>Created Date</th> 
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.sample_product_name}</td>
                <td>{task.sample_product_price}</td>
                <td>{task.created_at}</td>
                <td>
                  <button onClick={() => { console.log("Edit clicked for", task); }}>Edit</button>
                  <button onClick={() => { console.log("Delete clicked for", task);  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
