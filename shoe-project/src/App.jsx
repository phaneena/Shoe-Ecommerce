// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


// import Login from "./Login"
import { Route, Routes } from 'react-router-dom';
import Men from './Pages/Men';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Login from './Login';
import Register from './Register';
import Women from './Pages/Women';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import Orderlist from './Pages/Orderlist';
import Searchitems from './Pages/Searchitems';
import Layout from './Components/MainLayout';
import { LoginLayout } from './Components/LoginLayout';


function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />}/>
        <Route path='/mens' element={<Men />} />
        <Route path='/womens' element={<Women />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        
        <Route path='/order' element={<Order />}/>
        <Route path='/orderlist' element={<Orderlist />} />
        <Route path='/search' element={<Searchitems />} />
      </Route>
      <Route element={<LoginLayout />} >
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>

    </div>
  )
}

export default App
