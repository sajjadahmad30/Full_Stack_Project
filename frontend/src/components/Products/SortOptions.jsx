import React, { useState } from 'react'

const SortOptions = () => {
  const [searchParams, setSearchParams] = useState();

  const handleSortChange = (e)=>{
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);  
  }
  return (
    <div className="flex mb-4 items-center justify-end">
      <select 
      onClick={handleSortChange}
      value={searchParams?.get('sort') || ""}
      className='border p-2 rounded-md focus:outline-none'>
        <option value="">Default</option>
        <option value="priceAsc">Price: Low To High</option>
        <option value="priceDsc">Price: High To Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions
