import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
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
    },[cart])
  //  console.log("before",id)
    const handleAddToCart=(product)=>{
        const id=localStorage.getItem("id")
        console.log(product)
        // console.log("inside",id)
        const cartItem=cart.find((item)=>item.id===product.id)
        if(cartItem){
            return
        }
        else{
            const updateCart=[...cart,product]
            axios.patch(`http://localhost:5000/users/${id}`,{
                cart:updateCart
            })
            .then(() => {
                setCart(updateCart);
                setCartCount(updateCart.length); // Update cart count
            })
            .catch(error => console.log(error.message));
        }
    }

    const totalPrice=cart.reduce((total,curr)=>
        total+Number(curr.quantity)*Number(curr.price),0
    )
        // setTotalPrice(total)
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