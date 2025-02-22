import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import './App.css';

import { z } from "zod";

const ProductSchema = z.object({
  name: z.string()
  .min(3, {
    message: "Product name must be at least 3 characters.",
  })
  .regex(/[a-zA-Z]/, {
    message: "Product name must contain at least one letter.",
  }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Price must be a valid number with up to two decimal places.",
  }),
});

function App() {
  const [data, setData] = useState<any[]>([]);
  const [sampleProductName, setSampleProductName] = useState('');
  const [sampleProductPrice, setSampleProductPrice] = useState('');
  const [editProductId, setEditProductId] = useState<string | null>(null); 
  const [formNameResult, setFormNameResult] = useState('');
  const [formPriceResult, setFormPriceResult] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => { 
    axios.get("https://rnz7auon30.execute-api.ap-southeast-1.amazonaws.com/")
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
    await axios.post("https://rnz7auon30.execute-api.ap-southeast-1.amazonaws.com/insert", {
      sample_product_name: sampleProductName,
      sample_product_price: sampleProductPrice
    })
    .then((response) => {
      console.log(response.data);
      setSampleProductName('');
      setSampleProductPrice('');
      fetchData();

      Swal.fire({
        toast: true,
        icon: 'success',
        position: 'top-end',
        title: "A new product is added successfully.",
        timerProgressBar: true,
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    })
    .catch((error) => {
      Swal.fire({
        toast: true,
        icon: 'error',
        position: 'top-end',
        title: "Invalid Input",
        timerProgressBar: true,
        timer: 3500,
        showCancelButton: false,
        showConfirmButton: false,
      });
      console.error(error);
    });
  };

  const updateProduct = async () => {
    await axios.put(`https://rnz7auon30.execute-api.ap-southeast-1.amazonaws.com/update/${editProductId}`, {
      sample_product_name: sampleProductName,
      sample_product_price: sampleProductPrice
    })
    .then((response) => {
      console.log(response.data);
      setSampleProductName('');
      setSampleProductPrice('');
      setEditProductId(null);
      fetchData();

      Swal.fire({
        toast: true,
        icon: 'success',
        position: 'top-end',
        title: "A product is updated successfully.",
        timerProgressBar: true,
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    })
    .catch((error) => {
      Swal.fire({
        toast: true,
        icon: 'error',
        position: 'top-end',
        title: "Invalid Input",
        timerProgressBar: true,
        timer: 3500,
        showCancelButton: false,
        showConfirmButton: false,
      });
      console.error(error);
    });
  };

  const handleEdit = (task: any) => {
    setSampleProductName(task.sample_product_name);
    setSampleProductPrice(task.sample_product_price);
    setEditProductId(task.id)

    setFormNameResult('');
    setFormPriceResult('');
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const result = ProductSchema.safeParse({
      name: sampleProductName,
      price: sampleProductPrice,
    });

    if (result.success) {
      // Call either add or update
      if (editProductId) {
        updateProduct();
      } else {
        addProduct();
      }

      setFormNameResult('');
      setFormPriceResult('');

    } else {
      // Set form errors in state
      const formatted = result.error.format();
      // console.log(formatted.name?._errors[0])
      // console.log(formatted.price?._errors[0])

      const nameError = formatted.name?._errors[0] ?? '';
      const priceError = formatted.price?._errors[0] ?? ''; 

      setFormNameResult(nameError);
      setFormPriceResult(priceError);
    }
  };

  const deleteProduct = async (itemID : number, index: number) => {
    Swal.fire({
      toast: true,
      icon: 'success',
      position: 'top-end',
      title: `Are you sure to delete the Product no ${index}?`,
      timerProgressBar: false,
      confirmButtonColor: '#b33f40',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://rnz7auon30.execute-api.ap-southeast-1.amazonaws.com/delete/${itemID}`)
        .then((response) => {
          console.log(response.data);
          fetchData();

          Swal.fire({
            toast: true,
            icon: 'success',
            position: 'top-end',
            title: "A product is deleted successfully.",
            timerProgressBar: true,
            timer: 3000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          Swal.fire({
            toast: true,
            icon: 'error',
            position: 'top-end',
            title: `Can't Delete ${error}`,
            timerProgressBar: true,
            timer: 3500,
            showCancelButton: false,
            showConfirmButton: false,
          });
          console.error(error);
        });
      }
    });
  }

  return (
    <div className='flex flex-col md:flex-row md:gap-[50px] items-center justify-center'>
      <ProductForm 
        sampleProductName={sampleProductName}
        formNameResult={formNameResult}
        sampleProductPrice={sampleProductPrice} 
        formPriceResult={formPriceResult}
        setSampleProductName={setSampleProductName}
        setSampleProductPrice={setSampleProductPrice}
        handleSubmit={handleSubmit}
        editProductId={editProductId}
      />
      <ProductTable 
        data={data} 
        handleEdit={handleEdit} 
        deleteProduct={deleteProduct} 
      />
    </div>
  );
}

export default App;