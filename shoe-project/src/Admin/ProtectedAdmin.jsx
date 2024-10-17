import React, { useContext } from 'react'
import { productcontext } from '../Context/Admincontext'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = ({children}) => {
    const {logged} =useContext(productcontext)
  return (
    logged ? children :<Navigate to='/login' />
  )
}

export default ProtectedAdmin