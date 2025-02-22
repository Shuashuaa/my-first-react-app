interface Product {
    id: number;
    sample_product_name: string;
    sample_product_price: string;
    created_at: string;
}

interface ProductTableProps {
    data: Product[];
    handleEdit: (task: Product) => void;
    deleteProduct: (id: number, index: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ data, handleEdit, deleteProduct }) => {
    return (
        <div className="list mt-5">
        <h1 className="text-2xl mb-2">List of Products</h1>
        <table className="shadow-lg">
            <thead>
            <tr className="*:border *:border-gray-300 *:p-2">
                <th>No</th>
                {/* <th>Id</th> */}
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Created Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map((task, index) => (
                <tr key={task.id} className="border border-gray-300 *:p-2 hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    {/* <td className="border border-gray-300 p-2">{task.id}</td> */}
                    <td className="border border-gray-300 p-2">{task.sample_product_name}</td>
                    <td className="border border-gray-300 p-2">{task.sample_product_price}</td>
                    <td className="border border-gray-300 p-2">
                    {new Date(task.created_at).toISOString().split('T')[0]}
                    </td>
                    <td className="grid sm:grid-cols-2 gap-2">
                    <button
                        className="shadow border p-2 bg-green-300 rounded-md hover:bg-green-400"
                        onClick={() => handleEdit(task)}
                    >
                        Edit
                    </button>
                    <button
                        className="shadow border p-2 bg-red-300 rounded-md hover:bg-red-400"
                        onClick={() => deleteProduct(task.id, index + 1)}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default ProductTable;