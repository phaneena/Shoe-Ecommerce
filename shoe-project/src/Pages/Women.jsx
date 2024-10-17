import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';

function Women(){
    const [women,setWomen]=useState([])
    const {handleAddToCart}=useContext(shoecontext)
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const Products=await axios.get("http://localhost:5000/Products")
                const womendata=Products.data
                setWomen(womendata.filter((items)=>items.categories==='women'))
            }
            catch(error){
                console.log(error.message)
            }
        }
        fetchProducts()
    },[])

    // const handleAddToCart = (product) => {
    //     // This function could update a cart state or call an API
    //     console.log(`Added to cart: ${product.name}`);
    //     // Add your logic here (e.g., updating a cart in local state, context, or calling an API)
    // };
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
            {women.map((product)=>(
                <div key={product.id} className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    {
                        <img src={product.images} alt={product.name} 
                        className="w-full h-60 rounded-t object-cover" />
                    }
                    <div className="text-center">
                    <h1 className="mt-2 text-lg font-semibold">{product.name}</h1>
                    <p className="mt-1 text-gray-700"> ₹ {product.price}</p>
                    </div>
                    <button
                        className="w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                        onClick={() =>{
                            if(localStorage.getItem('id')){
                                handleAddToCart(product)
                                // toast.success('Item added successfully')
                            }
                            else{
                                navigate('/login')
                            }
                        }} // Call the add to cart function
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
            <ToastContainer />
        </div>
    )

        
}
export default Women