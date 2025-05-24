import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton';
const cart ={
    porducts :[
        {
            name: "Stylish Jacket",
            size : "M",
            color: "Black",
            price: 120,
            image: "https://picsum.photos/150?random=1"
        },
        {
            name: "Casual Sneakers",
            size : "45",
            color: "white",
            price: 110,
            image: "https://picsum.photos/150?random=2"
        },
    ],
    totalPrice:195,
}

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null)
    const [ShippingAddress, setShippingAddress] = useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        postalCode:"",
        country:"",
        phone:"",
    });

    const handleCreateCheckout = (e)=>{
        e.preventDefault();
        setCheckoutId(2321);
    };

    const handlePaymentSuccess = (details)=>{
        console.log('payment details, ', details);
        navigate("/order-confirmation")
    }

  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-7xl mx-auto py-10 px-6">
    {/* left section */}
    <div className="bg-white rounded-lg p-6">
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
            <h3 className='text-lg mb-4'>Contact Details</h3>
            <div className="mb-4">
                <label htmlFor="email" className='block text-gray-700'>Email</label>
                <input type="email" name="email" value="user@example.com"  
                className='w-full p-2 border rounded'
                disabled/>
            </div>
            <h3 className='text-lg mb-4'>Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="">
                    <label htmlFor="fname" className='text-gray-700 block'> First Name</label>
                    <input type="text" name="fname"
                    value={ShippingAddress.firstName}
                    onChange={(e)=> setShippingAddress({...ShippingAddress, firstName: e.target.value})}
                    className="w-full p-2 border rounded" required/>
                </div>

                <div className="">
                    <label htmlFor="lname" className='text-gray-700 block'> Last Name</label>
                    <input type="text" name="lname"
                    value={ShippingAddress.lastName}
                    onChange={(e)=> setShippingAddress({...ShippingAddress, lastName: e.target.value})}
                    className="w-full p-2 border rounded" required/>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input type="text" name="address" value={ShippingAddress.address} 
                onChange={(e)=> setShippingAddress({...ShippingAddress, address: e.target.value})}
                className='w-full p-2 border rounded'
                required/>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="">
                    <label htmlFor="fname" className='text-gray-700 block'> City</label>
                    <input type="text" name="city"
                    value={ShippingAddress.city}
                    onChange={(e)=> setShippingAddress({...ShippingAddress, city: e.target.value})}
                    className="w-full p-2 border rounded" required/>
                </div>

                <div className="">
                    <label htmlFor="lname" className='text-gray-700 block'> Postal Code</label>
                    <input type="text" name="postalCode"
                    value={ShippingAddress.postalCode}
                    onChange={(e)=> setShippingAddress({...ShippingAddress, postalCode: e.target.value})}
                    className="w-full p-2 border rounded" required/>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <input type="text" name="country" value={ShippingAddress.country} 
                onChange={(e)=> setShippingAddress({...ShippingAddress, country: e.target.value})}
                className='w-full p-2 border rounded'
                required/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Phone No</label>
                <input type="tel" name="phone" value={ShippingAddress.phone} 
                onChange={(e)=> setShippingAddress({...ShippingAddress, phone: e.target.value})}
                className='w-full p-2 border rounded'
                required/>
            </div>
            <div className="mt-6">
                {!checkoutId ? (
                    <button type='submit' 
                    className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>
                ):(
                    <div className="">
                        <h3 className="text-lg mb-4">Pay With Paypal</h3>
                        {/* paypal component  */}
                        <PaypalButton amount={100} onSuccess={handlePaymentSuccess} onError={(err)=> alert("Payment Failed, Try agin.")}/>
                    </div>
                )}
            </div>
        </form>
    </div>

    {/* Right Section */}
    <div className="text-gray-50 p-6 rounded-lg">
        <h3 className='text-lg mb-4'>Order Summary</h3>
        <div className="border-t py-4 mb-4">
            {cart.porducts.map((product, index)=>(
                <div key={index} className="flex items-start justify-between py-2 border-b">
                    <div className="flex items-center">
                        <img src={product.image} className='w-20 h-24 object-cover mr-4' />
                        <div>
                            <h3 className='font-bold text-black'>{product.name}</h3>
                            <p className='text-gray-500 '>Size: {product.size}</p>
                            <p className='text-gray-500 '>Color: {product.color}</p>
                        </div>
                    </div>
                        <p className='text-xl text-black'>${product.price?.toLocaleString()}</p>
                </div>
            ))}
        </div>
        <div className="flex text-black justify-between items-center text-lg mb-4">
            <p className=''>Subtotal</p>
            <p className=''>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex text-black justify-between items-center text-lg">
            <p>Shipping </p>
            <p>Free</p>
        </div>
        <div className="flex text-black justify-between items-center text-lg mb-4 border-t pt-4">
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
    </div>
   </div>
  )
}

export default Checkout
