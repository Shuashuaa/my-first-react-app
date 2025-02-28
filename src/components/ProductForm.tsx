import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";

interface ProductFormProps {
    sampleProductName: string;
    formNameResult: string;
    sampleProductPrice: string;
    formPriceResult: string;
    setSampleProductName: React.Dispatch<React.SetStateAction<string>>;
    setSampleProductPrice: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    editProductId: string | null;
    loading: boolean;
}
  
const ProductForm: React.FC<ProductFormProps> = ({
    sampleProductName,
    formNameResult,
    sampleProductPrice,
    formPriceResult,
    setSampleProductName,
    setSampleProductPrice,
    handleSubmit,
    editProductId,
    loading
}) => {

    return (
      <div>
        <h1 className='text-2xl mb-2'>{editProductId ? 'Edit Product' : 'Add a New Product'}</h1>
        <form className='flex flex-col gap-1 text-left' onSubmit={handleSubmit}>
            <Label className="text-sm font-bold">Enter a Product Name</Label>
            <Input
                value={sampleProductName} 
                onChange={(e) => setSampleProductName(e.target.value)}
                className="w-[350px] shadow appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                placeholder="Name" 
            />
            {formNameResult && <p className="text-red-400 text-sm">{formNameResult}</p>}
            
            <Label className="text-sm font-bold">Enter a Product Price</Label>
            <Input 
                value={sampleProductPrice}
                onChange={(e) => setSampleProductPrice(e.target.value)}
                className="w-[350px] shadow appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                placeholder="Price" 
            />
            {formPriceResult && <p className="text-red-400 text-sm">{formPriceResult}</p>}
            <Button className="w-[350px] my-2" disabled={loading}>
                {loading ? (
                <>
                    <Loader2 className="animate-spin mr-2" />
                    Loading...
                </>
                ) : ( editProductId ? 'Update' : 'Add' + ' Product' )}
            </Button>
        </form>
      </div>
    );
};

export default ProductForm;