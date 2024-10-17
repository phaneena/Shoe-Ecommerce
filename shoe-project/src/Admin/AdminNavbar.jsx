import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { IoIosLogOut } from "react-icons/io";

const AdminNavbar = () => {
  const navigate=useNavigate()
  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login')
  }

  return (
    <div className="flex h-screen sticky top-0">
      {/* Sidebar */}
      <nav className="flex-none w-60 bg-gray-400 text-black">
        <h1 className="text-xl lg:text-3xl font-bold text-center py-4">SHOE ZONE</h1>
        <div className="mt-4">
          <ul className="space-y-2">
            <Link to='/admin'>
              <li className='flex items-center p-4 hover:bg-gray-600 hover:text-white transition-all duration-200 font-bold'>
                DASHBOARD
              </li>
            </Link>
            <Link to="/adminuser">
              <li className="flex items-center p-4 hover:bg-gray-600 hover:text-white transition-all duration-200 font-bold">
                USER
              </li>
            </Link>
            <Link to="/adminproduct">
              <li className="flex items-center p-4 hover:bg-gray-600 hover:text-white transition-all duration-200 font-bold">
                PRODUCT
              </li>
            </Link>
          </ul>
        </div>
        <div className="p-4">
          <button onClick={handleLogout}  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-bold transition-all duration-200">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
