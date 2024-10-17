import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [user, setUser] = useState([]);
    const [productCount, setProductCount] = useState([]);
    const [statusCount, setStatusCount] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Products");
                setProductCount(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users");
                setUser(response.data);
                setStatusCount(response.data.filter((item) => item.status === false));
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchUsers();
    }, []);
    const salePrice=user.reduce((acc,cur)=>acc+cur.order.reduce((acc,order)=>acc+order.total,0),0)

    return (
        <div className="bg-gray-300 min-h-screen p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminuser">
                        <h2 className="text-xl font-bold mb-2">Total Users</h2>
                        <p className="text-2xl font-bold">{user.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminproduct">
                        <h2 className="text-xl font-bold mb-2">Total Products</h2>
                        <p className="text-2xl font-bold">{productCount.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                    <Link to="/adminuser">
                        <h2 className="text-xl font-bold mb-2">Status</h2>
                        <p className="text-2xl font-bold ">{statusCount.length}</p>
                    </Link>
                </div>
                <div className="bg-gray-500 hover:bg-green-500 p-6 rounded-lg shadow-md text-white">
                        <h2 className="text-xl font-bold mb-2">Sale Price</h2>
                        <p className="text-2xl font-bold ">₹ {salePrice}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
