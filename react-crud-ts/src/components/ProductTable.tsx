import { Button } from "@/components/ui/button";
import PaginationSection from "./PaginationSection";
import { useState, useEffect } from "react";

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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // mobile responsive
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(3);
        }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const lastItemIndex = currentPage * itemsPerPage; // 1 * 5 = 5 | 2 * 5 = 10
    const firstItemIndex = lastItemIndex - itemsPerPage; // 5 - 5 = 0 | 10 - 5 = 5
    const currentItems = data
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(firstItemIndex, lastItemIndex); // (0,5) | (5,10)

    return (
        <div className="list mt-5">
        <h1 className="text-2xl mb-2">List of Products</h1>
        <div className="w-full md:w-[500px] mb-3">
            <table className="shadow w-full">
                <thead className="sticky top-[-0.5px] bg-white border border-gray-600 z-10">
                    <tr className="*:border *:border-gray-300 *:p-1 text-gray-600 *:md:text-sm *:text-[12px]">
                    <th>No</th>
                    <th className="w-[120px]">Product Name</th>
                    <th>Product Price</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems
                    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    .map((task, index) => (
                        <tr key={task.id} className="border border-gray-300 *:p-1 hover:bg-gray-100 *:text-sm">
                        <td className="border border-gray-300 p-2 text-center">{firstItemIndex + index + 1}</td>
                        <td className="border border-gray-300 p-2">{task.sample_product_name}</td>
                        <td className="border border-gray-300 p-2 text-center">
                            ₱{parseFloat(task.sample_product_price).toLocaleString()}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">{new Date(task.created_at).toISOString().split("T")[0]}</td>
                        <td className="grid sm:grid-cols-2 gap-2">
                            <Button className="shadow border text-gray-700 bg-green-300 rounded-md hover:bg-green-400" onClick={() => handleEdit(task)}>
                            Edit
                            </Button>
                            <Button className="shadow border text-gray-700 bg-red-300 rounded-md hover:bg-red-400" onClick={() => deleteProduct(task.id, index + 1)}>
                            Delete
                            </Button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <PaginationSection 
            totalItems={data.length} 
            itemsPerPage={itemsPerPage} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
        />
        </div>
    );
};

export default ProductTable;