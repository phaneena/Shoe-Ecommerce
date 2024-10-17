import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shoecontext } from '../Context/ShopContext';
import { toast,ToastContainer } from 'react-toastify';

function SearchResults({ activeCategory }) {
  const [items, setItems] = useState([]);
  const {handleAddToCart}=useContext(shoecontext)
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const term = query.get('term');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch data asynchronously
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Products');
        setItems(response.data); // Set items once the data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once when component mounts

  useEffect(() => {
    // Filter items based on the search term and active category after items have been fetched
    if (term) {
      const results = items.filter((item) => {
        const matchesSearchTerm =
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.categories.toLowerCase().startsWith(term.toLowerCase());
        const matchesCategory = activeCategory ? item.categories.toLowerCase() === activeCategory.toLowerCase() : true; // Check category if set
        return matchesSearchTerm && matchesCategory; // Return true if both conditions are satisfied
      });
      setFilteredItems(results);
    } else {

      const results = items.filter((item) => {
        return activeCategory ? item.categories.toLowerCase() === activeCategory.toLowerCase() : true;
      });
      setFilteredItems(results);
    }
  }, [term, items, activeCategory]); 
  

  return (
    <div>
      <h2>Search Results for "{term}"</h2>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src={product.images} alt={product.name} className="w-full h-60 rounded-t object-cover"/>
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
                        }}
                    >
                        Add to Cart
                    </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      
    </div>
  );
}

export default SearchResults;
