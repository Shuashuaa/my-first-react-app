import { Button } from "@/components/ui/button"

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
            <div className="max-h-[330px] md:max-h-[350px] overflow-y-auto">
                <table className="shadow w-full">
                    <thead className="sticky top-[-0.5px] bg-white border border-gray-600 z-10">
                        <tr className="*:border *:border-gray-300 *:p-1 text-gray-600 *:md:text-sm *:text-[12px]">
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="max-h-[150px] overflow-y-auto">
                    {data
                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map((task, index) => (
                        <tr key={task.id} className="border border-gray-300 *:p-1 hover:bg-gray-100 *:text-sm">
                            <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 p-2">{task.sample_product_name}</td>
                            <td className="border border-gray-300 p-2 text-center">
                            ₱{parseFloat(task.sample_product_price).toLocaleString()}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                            {new Date(task.created_at).toISOString().split("T")[0]}
                            </td>
                            <td className="grid sm:grid-cols-2 gap-2">
                            <Button
                                className="shadow border text-gray-700 bg-green-300 rounded-md hover:bg-green-400"
                                onClick={() => handleEdit(task)}
                            >
                                Edit
                            </Button>
                            <Button
                                className="shadow border text-gray-700 bg-red-300 rounded-md hover:bg-red-400"
                                onClick={() => deleteProduct(task.id, index + 1)}
                            >
                                Delete
                            </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            
        </div>
    );
};

export default ProductTable;