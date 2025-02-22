import { Button } from "@/components/ui/button"

interface ProductFormProps {
    sampleProductName: string;
    formNameResult: string;
    sampleProductPrice: string;
    formPriceResult: string;
    setSampleProductName: React.Dispatch<React.SetStateAction<string>>;
    setSampleProductPrice: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    editProductId: string | null;
}
  
const ProductForm: React.FC<ProductFormProps> = ({
    sampleProductName,
    formNameResult,
    sampleProductPrice,
    formPriceResult,
    setSampleProductName,
    setSampleProductPrice,
    handleSubmit,
    editProductId
}) => {
    return (
      <div>
        <h1 className='text-2xl mb-2'>{editProductId ? 'Edit Product' : 'Add a New Product'}</h1>
        <form className='flex flex-col gap-1 text-left' onSubmit={handleSubmit}>
          <label>Enter a Product Name</label>
          <input
            value={sampleProductName} 
            onChange={(e) => setSampleProductName(e.target.value)}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Name" 
          />
          {formNameResult && <p className="text-red-400 text-sm">{formNameResult}</p>}
          
          <label>Enter a Product Price</label>
          <input 
            value={sampleProductPrice}
            onChange={(e) => setSampleProductPrice(e.target.value)}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Price" 
          />
          {formPriceResult && <p className="text-red-400 text-sm">{formPriceResult}</p>}
          
          {/* <button className='border border-gray-400 rounded-lg my-2 h-11 shadow'>
            {editProductId ? 'Update' : 'Add'} Product
          </button> */}
          <Button className="my-2">
            {editProductId ? 'Update' : 'Add'} Product
          </Button>
        </form>
      </div>
    );
};

export default ProductForm;