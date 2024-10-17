import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const shoecontext=createContext()
function ShopContext({children}){
    const [cart,setCart]=useState([])
    const [cartCount,setCartCount]=useState(0)
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false)
    // const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(()=>{
        const id=localStorage.getItem("id")
        const fetchProducts=async ()=>{
        try{

            const response = await axios.get(`http://localhost:5000/users/${id}`)
            setCart(response.data.cart)
            setCartCount(response.data.cart.length)
        }
        catch(error){
            console.log(error.message)
        }
    }
    fetchProducts()
    },[])
  //  console.log("before",id)
  const handleAddToCart = async (product) => {
    const id = localStorage.getItem("id");
    try {
        const productResponse = await axios.get(`http://localhost:5000/Products/${product.id}`);
        const currentProduct = productResponse.data;

        const userResponse = await axios.get(`http://localhost:5000/users/${id}`);
        const userCart = userResponse.data.cart;

        const existingCartItem = userCart.find(item => item.id === product.id);
        if (existingCartItem) {
            if (existingCartItem.quantity + 1 > currentProduct.quantity) {
                toast.error(`Cannot add more of ${currentProduct.name}. Only ${currentProduct.quantity - existingCartItem.quantity} left in stock.`);
                return;
            }
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
            const remainingCart = userCart.filter(item => item.id !== updatedCartItem.id);
            await axios.patch(`http://localhost:5000/users/${id}`, {
                cart: [...remainingCart, updatedCartItem]
            });
            setCart(prevCart => prevCart.map(item => (item.id === product.id ? updatedCartItem : item)));
            toast.success(`Increased quantity of ${currentProduct.name} in the cart.`);
        } else {
            const newCartItem = { ...product, quantity: 1 };
            await axios.patch(`http://localhost:5000/users/${id}`, { cart: [...userCart, newCartItem] });
            setCart(prevCart => [...prevCart, newCartItem]);
            toast.success("Item added successfully");
        }
    } catch (err) {
        toast.error('Failed to add product to the cart. Please try again.');
    }
};

        // console.log("inside",id)
        // const cartItem=cart.find((item)=>item.id===product.id)
        // if(cartItem){
        //     return
        // }
        // else{
        //     const updateCart=[...cart,product]
        //     axios.patch(`http://localhost:5000/users/${id}`,{
        //         cart:updateCart
        //     })
        //     .then(() => {
        //         setCart(updateCart);
        //         setCartCount(updateCart.length); // Update cart count
        //     })
        //     .catch(error => console.log(error.message));
        // }

    const totalPrice=cart.reduce((total,curr)=>
        total+Number(curr.quantity)*Number(curr.price),0
    )
    const handleRemove=(product)=>{
        const id=localStorage.getItem("id")
        console.log(product)
        const deletedCart=cart.filter((item)=>item.id!==product.id)
        axios.patch(`http://localhost:5000/users/${id}`,{
            cart:deletedCart
        })
        .then(()=>{
            setCart(deletedCart)
        })
    }



    return(
        <shoecontext.Provider value={{handleAddToCart,cart, cartCount,handleRemove,totalPrice,search,setSearch,showSearch,setShowSearch}}>
            {children}
        </shoecontext.Provider>
    )
}
export default ShopContext