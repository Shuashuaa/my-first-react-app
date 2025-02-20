import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // "Do Homework"
  // "House chore"
  // const [todoList, setTodoList] = useState([]);
  // const [newTask, setNewTask] = useState('');
  const [data, setData] = useState([]);
  const [sample_product_name, setSampleProductName] = useState('');
  const [sample_product_price, setSampleProductPrice] = useState('');

  // const handleChange = (event) => {
  //   setNewTask(event.target.value);
  // }

  // const addTask = () => {
  //   const newTodoList = [...todoList, newTask];
  //   setTodoList(newTodoList);
  // }

  // useEffect(()=>{
  //   axios.get("https://fwhnu5yop2.execute-api.ap-southeast-2.amazonaws.com/")
  //   .then((response)=> {setData(response.data.data)})
  //   .catch((error) => console.error(error))
  // }, [])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => { 
    axios.get("https://fwhnu5yop2.execute-api.ap-southeast-2.amazonaws.com/")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) { 
          setData(response.data.data);
        } else {
          console.error("Invalid API response format:", response.data);
          setData([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]); 
      });
  };

  const addProduct = async () => {
    await axios.post("https://fwhnu5yop2.execute-api.ap-southeast-2.amazonaws.com/insert", {
      sample_product_name: sample_product_name,
      sample_product_price: sample_product_price
    })
    .then((response) => {
        console.log(response.data);
        setSampleProductName('');
        setSampleProductPrice('');
        fetchData();
    })
    .catch((error) => console.error(error));
  };

  // console.log(data)

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* <div className='addTask'>
        <input className='border border-gray-600' onChange={handleChange}/>
        <button onClick={addTask}>Add Task</button>
      </div> */}

      {/* {newTask} */}
      <div>
        <h1 className='text-2xl mb-2'>Add a New Product</h1>
        <form className='flex flex-col'>
          <label>Enter a Product Name</label>
          <input
          value={sample_product_name} 
          onChange={(e) => setSampleProductName(e.target.value)}
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name"></input>
          {/* <input className='border border-gray-600' /> */}
          <label>Enter a Product Price</label>
          <input 
          value={sample_product_price}
          onChange={(e) => setSampleProductPrice(e.target.value)}
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Price"></input>
          {/* <input className='border border-gray-600' /> */}
          <button
          onClick={(e) => {
            e.preventDefault();
            addProduct();
          }}
          className='border border-gray-600 rounded-lg my-2'>Add</button>
        </form>
      </div>

      <div className='list mt-5'>
        <h1 className='text-2xl mb-2'>List of Products</h1>
        <table className='shadow-lg'>
          <thead>
            <tr className='*:border *:border-gray-400 *:p-2'>
              <th>Id</th>
              <th>Product Name</th> 
              <th>Product Price</th> 
              <th>Created Date</th> 
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index} className=''>
                <td className='border border-gray-400 p-2'>{task.id}</td>
                <td className='border border-gray-400 p-2'>{task.sample_product_name}</td>
                <td className='border border-gray-400 p-2'>{task.sample_product_price}</td>
                <td className='border border-gray-400 p-2'>{task.created_at}</td>
                <td className='flex flex-col gap-2 border border-gray-400 p-2'>
                  <button className='shadow border p-2 bg-green-300 rounded-md' onClick={() => { console.log("Edit clicked for", task); }}>Edit</button>
                  <button className='shadow border p-2 bg-red-300 rounded-md' onClick={() => { console.log("Delete clicked for", task);  }}>Delete</button>
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
