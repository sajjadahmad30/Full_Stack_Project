import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {

  const cartProducts =[
    {
      productId:1,
      name : "T-shirt",
      size: "M",
      color : "red",
      quantity:1,
      price:12,
      image:"https://picsum.photos/200?random=1"
    },
    {
      productId:2,
      name : "jeans",
      size: "M",
      color : "blue",
      quantity:2,
      price:20,
      image:"https://picsum.photos/200?random=2"
    },
  ]

  return (
    <div>
      {cartProducts.map((product, ind)=>(
        <div key={ind} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-center">
            <img src={product.image} className='w-20 h-24 object-cover mr-4 rounded' />
            <div className="">
              <h3>{product.name}</h3>
              <p className='text-sm text-gray-500'>Size: {product.size} | Color: {product.color}</p>
              <div className="flex items-center mt-2">
                <button className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                <span className='mx-4'>{product.quantity}</span>
                <button className='border rounded px-2 py-1 text-xl font-medium'>+</button>
              </div>
            </div>
          </div>
          <div className="">
            <p>${product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600'/>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents
