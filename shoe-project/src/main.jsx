import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import ShopContext from './Context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ShopContext>
      <App />
    </ShopContext>
    </BrowserRouter>
  </StrictMode>,
)
