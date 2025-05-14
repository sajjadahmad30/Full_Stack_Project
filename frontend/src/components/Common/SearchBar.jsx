import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchToggle = ()=>{
        setIsOpen(!isOpen)
    }

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log('search', searchTerm);
        setIsOpen(false)
    }

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? 
      (<form 
      onSubmit={handleSearch}
      className='relative flex items-center justify-center w-full'>
          <div className="relative w-1/2">
            <input type="text"
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Search" value={searchTerm} className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-xl focus:outline-none w-full placeholder:text-gray-700' />
          </div>
          {/* search icon */}
          <button type='submit' className='absolute right-[26%] top-1/2 transform -translate-y-1/2  text-gray-600 hover:text-gray-800'>
            <HiMagnifyingGlass className='w-6 h-6'/>
          </button>
          <button type='submit'
          onClick={handleSearchToggle}
          className='absolute right-4 top-1/2 transform -translate-y-1/2  text-gray-600 hover:text-gray-800'>
            <HiMiniXMark className='w-6 h-6'/>
          </button>
        </form>) 
      : (
        <button onClick={handleSearchToggle}>
            <HiMagnifyingGlass className='w-6 h-6'/>
        </button>
      )}
    </div>
  );
};

export default SearchBar
