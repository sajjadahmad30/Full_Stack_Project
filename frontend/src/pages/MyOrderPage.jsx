import React, { useEffect, useState } from 'react'

const MyOrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        setTimeout(() => {
            const mockOrders = [
                {
                    _id:"3242",
                    createdAt:new Date(),
                    shippingAdress : {city: "Bajaur Agency", country:"Pakistan"},
                    orderItems:[
                        {
                            name:"product 1",
                            image: "https://picsum.photos/500/500?random=8"
                        }
                    ],
                    totalPrice: 100,
                    isPaid: true,
                },
                {
                    _id:"345326",
                    createdAt:new Date(),
                    shippingAdress : {city: "Khybar Agency", country:"Pakistan"},
                    orderItems:[
                        {
                            name:"product 3",
                            image: "https://picsum.photos/500/500?random=3"
                        }
                    ],
                    totalPrice: 400,
                    isPaid: true,
                }
            ];

            setOrders(mockOrders)
            
        }, 1000);
    },[])
  return (
    <div className="max-w-7xl  mx-auto p-4 sm:p-6">
        <h2 className='text-xl sm:text-2xl font-bold mb-6 '>My Orders </h2>
        <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <table className='min-w-full text-left text-gray-500'>
            <thead className='min-w-full text-xs text-gray-700 uppercase'>
                <tr>
                    <th className='py-2 px-4 sm:py-3'>Image</th>
                    <th className='py-2 px-4 sm:py-3'>Order ID</th>
                    <th className='py-2 px-4 sm:py-3'>Created</th>
                    <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                    <th className='py-2 px-4 sm:py-3'>Items</th>
                    <th className='py-2 px-4 sm:py-3'>Price</th>
                    <th className='py-2 px-4 sm:py-3'>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? (
                    orders.map((order , index)=>(
                        <tr key={index} className='border-b hover:bg-gray-50 cursor-pointer'>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                <img src={order.orderItems[0].image}
                                className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg' alt="" />
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                {new Date(order.createdAt).toLocaleDateString()} {" "}
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                {order.shippingAdress ? `${order.shippingAdress.city}, ${order.shippingAdress.country}` : "N/A"}
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                               {order.orderItems.length}
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                               ${order.totalPrice}
                            </td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>
                               <span className={`${order.isPaid ? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}  px-2 rounded-full text-xs font-medium sm:text-sm`}>{order.isPaid ? "Paid" : "Pendding"} </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className='py-4 px-4 text-center text-gray-500' >You have no orders</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default MyOrderPage
