import React, { useContext, useEffect, useState } from 'react';
import { productcontext } from '../Context/Admincontext';
import { HiFolderAdd } from "react-icons/hi";
import * as Yup from 'yup';
import { IoMdClose } from "react-icons/io";
import {Formik,Field,Form,ErrorMessage} from 'formik'

const AdminProduct = () => {
  const {product,deleteProduct,addData,editData,categories}=useContext(productcontext)
  const [addProduct,setAddproduct]=useState(false)
  const [editProduct,setEditProduct]=useState(null)
  const [filterproduct,SetFilterproduct]=useState([])
  const [filtercategories,setFilterCategories]=useState([])
  const [selectedCategory,setSelectedcategory]=useState('All')


  //new product adding form
  
  const initialValues={
    name:'',
    price:'',
    quantity:'',
    categories:'',
    images:''
  }
  const validationSchema=Yup.object({
    name:Yup.string().required('Name is required'),
    price:Yup.number().required('Price is required'),
    quantity:Yup.number().required('quantity is required'),
    categories:Yup.string().required('category is required'),
    images:Yup.string().required('images required')
  })
  const onSubmit=(values,{resetForm})=>{
    console.log(values)
    
    addData(values)
    resetForm()
    setAddproduct(false);
  }
  const editSubmit=(values,{resetForm})=>{
    console.log(values)
    editData(values)
    resetForm()
    setEditProduct(null)
  }
  useEffect(()=>{
    setFilterCategories(['All',...categories])
    console.log(setFilterCategories)
    SetFilterproduct(product)
  },[product])

  const handlecategory=(e)=>{
      const value=e.target.value;
      setSelectedcategory(value)
      if(value==='All'){
        SetFilterproduct(product)
      }
      else{
        SetFilterproduct(product.filter((item)=>item.categories===value))
      }
  }
  return (
    <div className="p-4">
      <div className='flex items-center justify-between mb-4'>
      <select onChange={handlecategory} value={selectedCategory} className='p-2 rounded'>
        {filtercategories.map((items,index)=>
          <option key={index} value={items}>
            {items}
          </option>
        )}
      </select>
      <HiFolderAdd className='text-4xl cursor-pointer' onClick={()=>setAddproduct(true)}/>
      </div>
      <table className="w-full border border-gray-200">
        <thead className="text-center bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-md">PRODUCT NAME</th>
            <th className="px-4 py-2 text-md">QUANTITY</th>
            <th className="px-4 py-2 text-md">PRICE</th>
            <th className="px-4 py-2 text-md">CATEGORY</th>
            <th className="px-4 py-2 text-md">IMAGE</th>
            <th className="px-4 py-2 text-md">EDIT/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {filterproduct.slice().reverse().map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-300">
              <td className="px-6 py-2 text-md text-center ">{product.name}</td>
              <td className="px-6 py-2 text-md text-center">{product.quantity}</td>
              <td className="px-6 py-2 text-md text-center">₹ {product.price}</td>
              <td className="px-6 py-2 text-md text-center">{product.categories}</td>
              <td className="px-6 py-2 text-md text-center">
                <div className="flex justify-center">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded"
                  />
                </div>
              </td>
              <td className="px-6 py-2 text-md text-center ">
                <div className='space-y-4'>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded text-xs md:text-sm w-20" onClick={()=>setEditProduct(product)}>
                    Edit
                  </button>
                  <br />
                  <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded text-xs md:text-sm w-20" onClick={()=>deleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className='bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto"'>
            <IoMdClose className='absolute top-2 right-2 cursor-pointer text-2xl' onClick={()=>setAddproduct(false)}/>
            <Formik 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              >
                <Form className='space-y-4'>
                  <div className='flex flex-col'>
                    <label htmlFor='name' className='font-semibold'>Name</label>
                    <Field name='name' type='text' placeholder='Enter the Name' className='border border-gray-300 rounded p-2'/>
                    <ErrorMessage name='name' component='div' className="text-red-500 text-sm" />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='price' className='font-semibold'>Price</label>
                    <Field name='price' type='number' placeholder='Enter the Price' className='border border-gray-300 rounded p-2' />
                    <ErrorMessage name='price' component='div' className="text-red-500 text-sm" />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='quantity' className='font-semibold'>Quantity</label>
                    <Field name='quantity' type='number' placeholder='Enter the Quantity' className='border border-gray-300 rounded p-2' />
                    <ErrorMessage name='quantity' component='div' className="text-red-500 text-sm" />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='categories' className='font-semibold'>Category</label>
                    <Field name='categories' type='text' placeholder='Enter the category' className='border border-gray-300 rounded p-2' />
                    <ErrorMessage name='category' component='div' className="text-red-500 text-sm" />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor='images' className="font-semibold">Image URL</label>
                    <Field name="images" type="text" placeholder="Enter the image URL" className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                    <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className='flex flex-col'>
                  <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600">
                    Submit
                  </button>

                  </div>
                </Form>
              </Formik>
          </div>
        </div>
      )}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className='bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto"'>
          <IoMdClose className='absolute top-2 right-2 cursor-pointer text-2xl' onClick={()=>setEditProduct(false)}/>
          <Formik 
            initialValues={{
              id:editProduct.id,
              name:editProduct.name,
              price:editProduct.price,
              quantity:editProduct.quantity,
              categories:editProduct.categories,
              images:editProduct.images
            }}
            validationSchema={validationSchema}
            onSubmit={editSubmit}
            >
              <Form className='space-y-4'>
                <div className='flex flex-col'>
                  <label htmlFor='name' className='font-semibold'>Name</label>
                  <Field name='name' type='text' placeholder='Enter the Name' className='border border-gray-300 rounded p-2'/>
                  <ErrorMessage name='name' component='div' className="text-red-500 text-sm" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='price' className='font-semibold'>Price</label>
                  <Field name='price' type='number' placeholder='Enter the Price' className='border border-gray-300 rounded p-2' />
                  <ErrorMessage name='price' component='div' className="text-red-500 text-sm" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='quantity' className='font-semibold'>Quantity</label>
                  <Field name='quantity' type='number' placeholder='Enter the Price' className='border border-gray-300 rounded p-2' />
                  <ErrorMessage name='quantity' component='div' className="text-red-500 text-sm" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='categories' className='font-semibold'>Category</label>
                  <Field name='categories' type='text' placeholder='Enter the category' className='border border-gray-300 rounded p-2' />
                  <ErrorMessage name='category' component='div' className="text-red-500 text-sm" />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor='images' className="font-semibold">Image URL</label>
                  <Field name="images" type="text" placeholder="Enter the image URL" className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                  <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                </div>
                <div className='flex flex-col'>
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600">
                  Submit
                </button>

                </div>
              </Form>
            </Formik>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminProduct;
