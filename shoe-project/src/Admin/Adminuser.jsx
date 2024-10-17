import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const Adminuser = () => {
  const [users, setUsers] = useState([]);
  const [userlist,setUserlist]=useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []); 

  const handleStatus=(id,status)=>{
    axios.patch(`http://localhost:5000/users/${id}` ,{status:!status})
    setUsers(users.map((user)=>user.id===id?{...user,status:!status}:{...user}))

  }
  return (
    <div>
      <table className='bg-gray-100 w-full'>
        <thead className="text-center bg-gray-300">
          <tr>
            <th className="px-4 py-2 text-md">Name</th>
            <th className="px-4 py-2 text-md">Username</th>
            <th className="px-4 py-2 text-md">Email</th>
            <th className="px-4 py-2 text-md">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-500" onDoubleClick={()=>setUserlist(user)}>
              <td className="px-6 py-2 text-md text-center">{user.name}</td>
              <td className="px-6 py-2 text-md text-center">{user.username}</td>
              <td className="px-6 py-2 text-md text-center">{user.email}</td>
              <td className="px-6 py-2 text-md text-center"><button
                    onClick={() => handleStatus(user.id, user.status)}
                    className={`px-4 py-1 rounded font-semibold text-white ${
                      user.status ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}>
                    {user.status ? 'block' : 'unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userlist && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50'>
        <div className='bg-white rounded-lg p-8 relative max-w-lg w-full h-3/4 overflow-y-auto shadow-lg'>
          <IoMdClose className='absolute top-3 right-3 cursor-pointer text-2xl text-gray-700 hover:text-red-500' onClick={() => setUserlist(null)} />
          <div className='mb-4'>
            <h2 className='text-xl font-bold mb-2'>User Details</h2>
            <p className='text-gray-700'><strong>Name:</strong> {userlist.name}</p>
            <p className='text-gray-700'><strong>Email:</strong> {userlist.email}</p>
          </div>
          <div className='border-t border-gray-300 pt-4'>
            {userlist.order.length === 0 ? (
              <h3 className='text-lg font-semibold text-gray-600'>No Orders Placed</h3>
            ) : (
              <div>
                <h3 className='text-lg font-semibold mb-2'>Order Details</h3>
                {userlist.order.map((order,index) => (
                  <div key={order.id} className='mb-4 p-4 bg-gray-100 rounded-lg'>
                    <p className='text-lg font-semibold mb-2'>Order {index + 1}</p> 
                    {order.items.map((item) => (
                      <div key={item.id} className='flex justify-between mb-2'>
                        <span className='font-medium text-gray-800'>{item.name}</span>
                        <span className='text-gray-600'>Qty: {item.quantity}</span>
                        <span className='font-medium text-gray-900'>₹ {item.price}</span>
                      </div>
                    ))}
                    <div className='flex justify-between border-t pt-2 mt-2'>
                      <span className='font-bold text-lg'>Total:</span>
                      <span className='font-bold text-lg text-gray-900'>₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default Adminuser;
