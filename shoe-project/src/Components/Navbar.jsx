import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { shoecontext } from '../Context/ShopContext';
import { toast, ToastContainer } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const { cartCount,setShowSearch } = useContext(shoecontext);

    const handleLogout = () => {
        localStorage.removeItem('id');
        toast.success('Logout successfully');
        navigate('/login');
        window.location.reload();
    };

    const handleCart = () => {
        if (!localStorage.getItem('id')) {
            toast.success('Must be logged in');
        } else {
            navigate('/cart');
        }
    };

    const handleOrderList = () => {
        if (!localStorage.getItem('id')) {
            toast.success('Must be logged in');
        } else {
            navigate('/orderlist');
        }
    };

    // const handleSearch = (e) => {
    //     const term = e.target.value;
    //     const categoryParam = activeCategory ? `&category=${activeCategory}` : '';
    //     navigate(`/search?term=${encodeURIComponent(term.trim())}${categoryParam}`);

    // };
    

    // const handleCategoryClick = (category) => {
    //     setActiveCategory(category);
    //     console.log(activeCategory,'values')
    // };

    return (
        <div className='flex items-center justify-between py-4 font-medium'>
            <NavLink className="navbar-brand" to="/" onClick={() => setActiveCategory('')}>
                <h1 className="text-xl lg:text-3xl">SHOE ZONE</h1>
            </NavLink>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/'>
                    <li>HOME</li>
                </NavLink>
                <NavLink to='/shop'>
                    <li>SHOP</li>
                </NavLink>
                <NavLink to='/mens'>
                    <li>MEN</li>
                </NavLink>
                <NavLink to='/womens'>
                    <li>WOMEN</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <div className="relative sm:flex items-center">
                    <span className="absolute right-2">
                        <CiSearch onClick={()=>setShowSearch(true)} className='text-2xl cursor-pointer mb-0' />
                    </span>
                </div>
                <div className='group relative'>
                    <CgProfile className='text-3xl cursor-pointer'/>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-30 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                            <Link to='/login'><p className='cursor-pointer hover:text-black'>Login</p></Link>
                            <button onClick={handleOrderList}><p className='cursor-pointer hover:text-black'>Orders</p></button>
                            <button onClick={handleLogout}><p className='cursor-pointer hover:text-black'>Logout</p></button>
                        </div>
                    </div>
                </div>
                <button onClick={handleCart} className="relative">
                    <IoMdCart className="text-3xl cursor-pointer" />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs sm:-top-3 sm:-right-3 sm:w-5 sm:h-5 sm:text-sm lg:-top-4 lg:-right-4 lg:w-6 lg:h-6 lg:text-sm">
                            {cartCount}
                        </span>
                    )}
                </button>
                <IoIosMenu onClick={() => setVisible(true)} className='text-3xl cursor-pointer sm:hidden'/>  
            </div>


            {/* menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>    
            <div className='flex flex-col text-gray-600'>                    
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>  
                    {/* <RiArrowDropDownLine /> */}
                    <p>Back</p>                    
                </div>
                <NavLink onClick={()=>setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/shop' className='py-2 pl-6 border'>SHOP</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/mens' className='py-2 pl-6 border'>MEN</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/womens' className='py-2 pl-6 border'>WOMEN</NavLink>
            </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Navbar;
