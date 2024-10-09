// // import axios from 'axios'
// // import React, { useEffect, useState } from 'react'


// // const Orderlist = () => {
// //     const[order,setOrder]=useState([])
// //     useEffect(()=>{
// //         const fetchdata=async()=>
// //             {
// //                 const id=localStorage.getItem('id')
// //                 try{
// //                     const response=await axios.get(`http://localhost:5000/users/${id}`)
// //                     const userorder=response.data.order ||[]
// //                     setOrder(userorder)
                    
// //                 }
// //                 catch(error){
// //                     console.log(error.message)
// //                 }
// //             }
// //             fetchdata() 

// //     },[])
// //   return (
// //     <div>
// //         <h1>Orderlist</h1>
// //         {order.length===0 ?(<h1>No Orders found</h1>
// //         :(order.map((product)=>(
// //             <div key={product.id} className="mb-4 border p-2">>
// //                 <img src={product.images} className="w-200 h-60 rounded-t object-cover" />
// //                 <h1 className="mt-2 text-lg font-semibold">{product.name}</h1>
// //                 <p className="mt-1 text-gray-700">${product.price}</p>
// //             </div>

// //         ))}
// //     </div>
// //   )
// // }

// // export default Orderlist


// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { shoecontext } from '../Context/ShopContext';

// const Orderlist = () => {
//     const [orders, setOrders] = useState([]);
//     const {handleClear}=useContext(shoecontext)

//     useEffect(() => {
//         const fetchOrders = async () => {
//             const id = localStorage.getItem('id'); // Get user ID from local storage
//             try {
//                 const response = await axios.get(`http://localhost:5000/users/${id}`);
//                 const userOrders = response.data.order || []; // Fetch user orders
//                 setOrders(userOrders); // Set orders state
//             } catch (error) {
//                 console.log('Error fetching orders:', error.message);
//             }
//         };

//         fetchOrders(); // Call function to fetch orders
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto px-4 py-6">
//             <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
//             {orders.length === 0 ? (
//                 <p className="text-center text-lg">No orders found.</p> // Display message if no orders exist
//             ) : (
//                 orders.map((order, index) => (
//                     <div key={index} className="mb-4 border p-4 rounded-md shadow-md">
//                         {/* <h2 className="font-bold">Order #{index + 1}</h2>
//                         <h3 className="mt-2 text-lg">Total: ${order.total.toFixed(2)}</h3> */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//                             {order.items.map((product) => (
//                                 <div key={product.id} className="flex items-center border-b py-2">
//                                     <img
//                                         src={product.images}
//                                         className="w-24 h-24 object-cover rounded-md"
//                                         alt={product.name}
//                                     />
//                                     <div className="ml-4">
//                                         <p className="font-semibold">{product.name}</p>
//                                         <p className="text-gray-600">${product.price.toFixed(2)}</p>
//                                     </div>
//                                 </div>
                                
//                             ))}
//                         </div>
//                     </div>
//                 ))
//             )}
//             <button className="bg-black text-white px-6 py-2 rounded-2xl w-1/2 mt-4 hover:bg-red-600 text-sm"
//              onClick={() => handleClear(orders.id)}>CLEAR ORDER</button>
//         </div>
//     );
// };

// export default Orderlist;


import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { shoecontext } from '../Context/ShopContext';

const Orderlist = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const id = localStorage.getItem('id'); // Get user ID from local storage
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                const userOrders = response.data.order || []; // Fetch user orders
                setOrders(userOrders); // Set orders state
            } catch (error) {
                console.log('Error fetching orders:', error.message);
            }
        };

        fetchOrders(); // Call function to fetch orders
    }, []);

    // Function to delete a specific order
    // const handleDeleteOrder = async (orderId) => {
    //     const id = localStorage.getItem('id'); // Get user ID from local storage
    //     try {
    //         await axios.delete(`http://localhost:5000/users/${id}/orders/${orderId}`); // Adjust this URL to match your API
    //         // Update local state to remove the deleted order
    //         setOrders(orders.filter(order => order.id !== orderId));
    //     } catch (error) {
    //         console.log('Error deleting order:', error.message);
    //     }
    // };

    // Function to clear all orders
    const handleClearAllOrders = async (product) => {
        const id=localStorage.getItem("id")
        console.log(product)
        const deletedOrder=orders.filter((item)=>item.id!==product.id)
        axios.patch(`http://localhost:5000/users/${id}`,{
            order:deletedOrder
        })
        .then(()=>{
            setOrders(deletedOrder)
        })
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
            {orders.length === 0 ? (
                <p className="text-center text-lg">No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="mb-4 border p-4 rounded-md shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {order.items.map((product) => (
                                <div key={product.id} className="flex items-center border-b py-2">
                                    <img
                                        src={product.images}
                                        className="w-24 h-24 object-cover rounded-md"
                                        alt={product.name}
                                    />
                                    <div className="ml-4">
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <button 
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
                            onClick={() => handleDeleteOrder(order.id)} // Pass the order ID to delete
                        >
                            DELETE ORDER
                        </button> */}
                    </div>
                ))
            )}
             {orders.length > 0 && (
                <button 
                    className="bg-black text-white px-6 py-2 rounded-2xl w-1/2 mt-4 hover:bg-red-600 text-sm"
                    onClick={handleClearAllOrders}
                >
                    CLEAR ALL ORDERS
                </button>
            )}
        </div>
    );
};

export default Orderlist;
