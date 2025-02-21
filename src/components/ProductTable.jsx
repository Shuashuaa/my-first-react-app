const ProductTable = ({ data, handleEdit, deleteProduct }) => {
    return (
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
              <tr key={index} className='border border-gray-400 *:p-2'>
                <td className='border border-gray-400 p-2'>{task.id}</td>
                <td className='border border-gray-400 p-2'>{task.sample_product_name}</td>
                <td className='border border-gray-400 p-2'>{task.sample_product_price}</td>
                <td className='border border-gray-400 p-2'>{new Date(task.created_at).toISOString().split('T')[0]}</td>
                <td className='grid sm:grid-cols-2 gap-2 border'>
                  <button className='shadow border p-2 bg-green-300 rounded-md' onClick={() => handleEdit(task)}>Edit</button>
                  <button className='shadow border p-2 bg-red-300 rounded-md' onClick={() => deleteProduct(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ProductTable;