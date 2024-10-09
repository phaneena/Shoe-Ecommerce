import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
function Shop() {
    const [productList, setProductList] = useState([]);
    const {handleAddToCart,search,showSearch}=useContext(shoecontext)
    const navigate=useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Products");
                setProductList(response.data); // Store fetched data in state
            } catch (error) {
                console.error("Error fetching the products", error);
            }
        };

        fetchProducts();
    }, []);
    

    const applyFilter=()=>{
        if(showSearch && search){
            prouctcopy=productList.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
        }
    }
    useEffect(()=>{
        applyFilter();
    },[search,showSearch])
    // const  = (product) => {
    //     // This function could update a cart state or call an API
    //     console.log(`Added to cart: ${product.name}`);
    //     // Add your logic here (e.g., updating a cart in local state, context, or calling an API)
    // };

    return (
        <div>
            <h1 className="font-bold text-3xl text-center" >LATEST COLLECTION</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                    {/* <div className="w-36 h-36 overflow-hidden mb-2"> Set to smaller size */}
                        <img
                            src={product.images}
                            alt={product.name}
                            className="w-full h-60 rounded-t object-cover" // Full width and height of the container
                        />
                    <h1 className="mt-2 text-lg font-semibold text-center">{product.name}</h1>
                    <p className="mt-1 text-gray-700 text-center">${product.price}</p>
                    <button
                        className="w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                        onClick={() =>{
                            if(localStorage.getItem('id')){
                                handleAddToCart(product)
                                toast.success('Item added successfully')
                            }
                            else{
                                toast.success('Must be logged in')
                                navigate('/login')
                            }
                        }} // Call the add to cart function
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
        <ToastContainer />
        </div>
    );
}

export default Shop;
