import React, { useContext, useEffect, useState } from 'react'
import { shoecontext } from '../Context/ShopContext'
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';


export const Search = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(shoecontext)
    const location=useLocation();
    const [visible,setVisible]=useState(false)

    useEffect(()=>{
        if(location.pathname.includes('/shop')){
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    },[location])
    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border-gray-400 px-5 py-2 my-2 mx-3 rounded w-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={handleSearch} type='text' placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'/>

            <CiSearch className='w-4'/>
        </div>
        <RxCross2 onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer'/>
    </div>
  ):null
}
