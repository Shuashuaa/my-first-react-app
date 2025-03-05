import { Button } from "@/components/ui/button";
import PaginationSection from "./PaginationSection";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
    const [filterQuery, setFilterQuery] = useState("");

    // mobile responsive
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(5);
            } else {
                setItemsPerPage(4);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // if filterQuery Changes value the pagination page will go back to 1
    useEffect(() => {
        setCurrentPage(1)
    },[filterQuery])
    
    const lastItemIndex = currentPage * itemsPerPage; // 1 * 5 = 5 | 2 * 5 = 10
    const firstItemIndex = lastItemIndex - itemsPerPage; // 5 - 5 = 0 | 10 - 5 = 5

    // Filter the data based on the filter query
    const filteredItems = data.filter((task) =>
        task.sample_product_name.toLowerCase().includes(filterQuery.toLowerCase())
    );

    const currentItems = filteredItems
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(firstItemIndex, lastItemIndex); // (0,5) | (5,10)

    return (
        <div className="list mt-5">

            {/* Filter Input */}
            <div className="md:flex justify-between mb-4">
                <h1 className="text-2xl mb-2">List of Products</h1>
                <div className="relative w-full md:w-[230px]">
                    {/* Prepend Loader2 icon */}
                    <Search className="absolute left-3 top-[45%] transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="search..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full md:w-[230px] pl-10 pr-3 py-2 border border-gray-400 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

        <div className="w-full md:w-[500px] mb-3">
            <table className="w-[350px] md:w-[500px] shadow">
                <thead className="sticky top-[-0.5px] bg-white border border-gray-600 z-10">
                    <tr className="*:border *:border-gray-300 *:px-1 text-gray-600 *:md:text-sm *:text-[12px]">
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
                            <td className="grid gap-2">
                                
                                { itemsPerPage == 5 ?
                                <div className="grid sm:grid-cols-2">
                                    <Button className="shadow border text-gray-700 bg-green-300 rounded-md hover:bg-green-400" onClick={() => handleEdit(task)}>
                                        Edit
                                    </Button><Button className="shadow border text-gray-700 bg-red-300 rounded-md hover:bg-red-400" onClick={() => deleteProduct(task.id, firstItemIndex + index + 1)}>
                                            Delete
                                    </Button>
                                </div>
                                :
                                <>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="bg-gray-300 text-black">...</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <p>{task.sample_product_name}</p>
                                            <div className="grid grid-cols-2">
                                                <Button className="shadow border text-gray-700 bg-green-300 rounded-md hover:bg-green-400" onClick={() => handleEdit(task)}>
                                                Edit
                                                </Button>
                                                <Button className="shadow border text-gray-700 bg-red-300 rounded-md hover:bg-red-400" onClick={() => deleteProduct(task.id, firstItemIndex + index + 1)}>
                                                Delete
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <PaginationSection 
            totalItems={filteredItems.length} 
            itemsPerPage={itemsPerPage} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
        />
        </div>
    );
};

export default ProductTable;