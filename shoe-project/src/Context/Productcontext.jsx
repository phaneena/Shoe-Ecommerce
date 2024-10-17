// import React, { createContext, useState } from 'react'

// export const procontext=createContext()
// const Productcontext = ({children}) => {
//     const [productList, setProductList] = useState([]);
//     const [filterProduct,setFilterProduct]=useState([])

//     //fetch product 
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/Products");
//                 setProductList(response.data); // Store fetched data in state
//             } catch (error) {
//                 console.error("Error fetching the products", error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const searchProducts = (product) => {
//         const filterProduct = productList.filter(
//           (item) => item.title.toLowerCase().includes(product.toLowerCase())
//           // console.log(filterProduct);
//         );
//         setFilterProduct(filterProduct)
//     }

//   return (
//     <div>
//         <procontext.Provider value={{productList,filterProduct,searchProducts}}>
//             {children}
//         </procontext.Provider>
//     </div>
//   )
// }

// export default Productcontext