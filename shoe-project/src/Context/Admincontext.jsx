import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast} from 'react-toastify'

export const productcontext=createContext()
const Admincontext = ({children}) => {
    const [product,setProduct]=useState([])
    const [categories,setCategories]=useState([])
    const [logged,setLogged]=useState(null)

  //products
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:5000/Products');
            setCategories([...new Set(response.data.map(p=>p.categories))])
            console.log(categories)
            setProduct(response.data);
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchProducts();
      }, []);

      //Admin add newproduct
      const addData=async(newproduct)=>{
        try{
          await axios.post('http://localhost:5000/Products',newproduct)
          
          setProduct(prevProducts => [...prevProducts, newproduct]);
          toast.success('new product added successfully')
        }
        catch(error){
          console.log(error.message);
        }
        
      }


   //Admin delete button
    
    const deleteProduct=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/Products/${id}`)
            console.log(product)
            const update=product.filter((item)=>item.id!==id)
            setProduct(update);
            toast.success('deleted successfully')
        }
        catch(error){
            console.log(error.message)
        }
    }
    const editData=async(product)=>{
        try{
          const id=product.id
          const response=await axios.put(`http://localhost:5000/Products/${id}`,product)
          setProduct((prevProducts)=>
            prevProducts.map((item)=>item.id===id ? response.data :item)
          ) 
          toast.success('edited product updated successfully')
        }
        catch(error){
          console.log(error.message);
          
        }
    }
    return (
        <productcontext.Provider value={{deleteProduct,product,editData,addData,categories,logged,setLogged}}>
            {children}
        </productcontext.Provider>
    )
}

export default Admincontext