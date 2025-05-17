import React from 'react'
import menCollectionImg from '../../assets/mens-collection.webp'
import womenCollectionImg from '../../assets/womenImg.jpg'
import { Link } from 'react-router-dom'
const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className="flex flex-col md:flex-row container mx-auto gap-8">
        {/* womens collection section  */}
        <div className="relative flex-1">
            <img src={womenCollectionImg} className='w-full h-[700px] object-cover' />
            <div className="absolute bottom-0 left-8 bg-white mb-4 bg-black/90 p-4">
            <h2 className='text-2xl font-bold text-gray-900  mb-3'>Women's Collection</h2>
            <Link to='/collections/all?gender=Women' 
            className='text-gray-900  underline'
            >Shop Now</Link>
            </div>
        </div>
        {/* men collection section  */}
        <div className="relative flex-1">
            <img src={menCollectionImg} className='w-full h-[700px] object-cover' />
            <div className="absolute bottom-0 left-8 mb-4 bg-white bg-black/90 p-4">
            <h2 className='text-2xl font-bold text-gray-900  mb-3'>Men's Collection</h2>
            <Link to='/collections/all?gender=Women' 
            className='text-gray-900  underline'
            >Shop Now</Link>
            </div>
        </div>
      </div>
    </section>
  )
}

export default GenderCollectionSection
