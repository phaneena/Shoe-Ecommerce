import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import ShopContext from './Context/ShopContext.jsx'
import Admincontext from './Context/Admincontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Admincontext>
    <ShopContext>
      <App />
    </ShopContext>
    </Admincontext>
    </BrowserRouter>
  </StrictMode>,
)
