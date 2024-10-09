// import { useContext } from "react";
// import { shoecontext } from "../Context/ShopContext";
// import { useNavigate } from "react-router-dom";

// function Cart(){
//     const navigate=useNavigate()
//     const {cart,handleRemove,totalPrice}=useContext(shoecontext)
//     console.log(cart);
    
//     return(
//         <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14 mt-16">
//             <h1 className="mt-2 text-lg font-semibold text-center">YOUR CART</h1>
//             {(cart.length===0)?(<h1 className="text-lg">cart is empty</h1>):
//                 (<div>
//                   {cart.map((product)=>(
//                     <div key={product.id}>
//                     <img
//                             src={product.images}
//                             alt={product.name}
//                             className="w-full h-60 rounded-t object-cover"/>
//                             <h1 className="mt-2 text-lg font-semibold text-center">{product.name}</h1>
//                             <p className="mt-1 text-gray-700 text-center">{product.price}</p>
//                             <button className='items-center bg-black text-white px-7 ml-8 rounded-3xl h-9 w-30 hover:bg-red-600 text-sm ' onClick={()=>handleRemove(product)}>REMOVE</button>
//                 </div>

//             ))}<div className="flex justify-end">
//                 <button className="bg-gray-200 text-black px-7 rounded-2xl h-10 w-40 hover:bg-green-900 hover:text-white text-sm" onClick={()=>(navigate('/order'))}>PLACEORDER</button>
//                 <br />
//                 <h1>TOTAL :{totalPrice}</h1>
//             </div>
//             </div>
//         )
            
//             }
            
//         </div>
        
//     )
// }

// export default Cart




import { useContext } from "react";
import { shoecontext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
    const { cart, handleRemove, totalPrice } = useContext(shoecontext);
    
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-center mb-6">YOUR CART</h1>
            
            {cart.length === 0 ? (
                <h1 className="text-lg text-center">Your cart is empty</h1>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {cart.map((product) => (
                            <div key={product.id} className="border rounded-lg shadow-lg p-4">
                                <img
                                    src={product.images}
                                    alt={product.name}
                                    className="w-full h-60 rounded-t object-cover mb-4"
                                />
                                <h1 className="text-lg font-semibold text-center">{product.name}</h1>
                                <p className="text-center text-gray-700">${product.price}</p>
                                <p className="text-center text-gray-700">Quantity</p>
                                <button 
                                    className="bg-black text-white px-6 py-2 rounded-2xl w-full mt-4 hover:bg-red-600 text-sm"
                                    onClick={() => handleRemove(product)}
                                >
                                    REMOVE
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center sm:items-end">
                        <div className="flex items-center justify-between w-full sm:w-auto mb-4">
                            <h1 className="text-xl font-semibold">TOTAL: ${totalPrice}</h1>
                        </div>
                        <button 
                            className="bg-gray-200 text-black px-8 py-2 rounded-2xl hover:bg-green-900 hover:text-white text-sm"
                            onClick={() => navigate('/order')}
                        >
                            PLACE YOUR ORDER
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
