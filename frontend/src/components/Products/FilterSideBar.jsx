import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FilterSideBar = () => {
    const [searchParams, setSearchParams] = useState("");
    const navigate = useNavigate();
    const [filter, setfilter] = useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice:100,
    });

    const [priceRange , setPriceRange] = useState([0,100]);

    const categories = ["Top Wear", "Bottom Wear"];

    const color=[
        "Red",
        "Blue",
        "Black",
        "White",
        "Green",
        "Pink",
        "Yellow",
        "Beige",
        "Navy",
    ];

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const materials = [
        "Cotton",
        "Polyester",
        "Rayon",
        "Wool",
        "Silk",
        "Linen",
        "Fleece",
        "Viscose",
        "Denim",
    ];

    const brands = [
        "Nike",
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",
    ];

    const genders = ["Men", "Women"];

    useEffect(()=>{
        const params = Object.fromEntries([...searchParams]);
        
        setfilter({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand? params.brand.split(",") : [],
            minPrice: params.minPrice || 0, 
            maxPrice: params.maxPrice || 100, 
        });

        setPriceRange([0, params.maxPrice || 100])
    }, [setSearchParams]);


    const handleFilterChange = (e)=>{
      const {name, value, checked, type} = e.target;
      const newFilters = {...filter};

      if(type === "checkbox"){
        if(checked){
          newFilters[name] = [...(newFilters[name] || []), value];  
        }else{
          newFilters[name] = newFilters[name].filter((item)=> item !== value);
        }
      }else{
          newFilters[name] = value;
      }
      setfilter(newFilters);
      updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters)=>{
      const params = new URLSearchParams();
      Object.keys(newFilters).forEach((key)=>{
        if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
          params.append(key, newFilters[key].join(","));
        }else if(newFilters[key]){
          params.append(key, newFilters[key]);
        }
      });
      setSearchParams(params);
      navigate(`?${params.toString()}`)   // ?category=Bottom+Wear&size=XS%2CS
    }

    const handlePriceChange = (e)=>{
      const newPrice  = e.target.value;
      setPriceRange([0, newPrice]);
      const newFilters = {...filter, minPrice: 0, maxPrice:newPrice};
      setfilter(filter);
      updateURLParams(newFilters);
    }
    
  return (
    <div className="p-4">
        <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

        {/* category filter */}
        <div className="mb-6">
            <label htmlFor='category' className='block text-gray-600 font-medium mb-2'>Category</label>
            {categories.map((category,index)=>(
                <div className="flex items-center mb-1" key={index}>
                    <input
                    value={category}
                    onClick={handleFilterChange}
                    checked={filter.category === category}
                    type="radio" name='category' id="category" className='h-4 w-4 mr-2  text-blue-500 focus:ring-blue-400 border-gray-300'/>
                    <span className='text-gray-700'>{category}</span>
                </div>
            ))}
        </div>
       
       
         {/* gender filter */}
        <div className="mb-6">
            <label htmlFor='gender' className='block text-gray-600 font-medium mb-2'>Category</label>
            {genders.map((gender,index)=>(
              <div className="flex items-center mb-1" key={index}>
              <input
               value={gender}
               onClick={handleFilterChange}
               checked={filter.gender === gender}
              type="radio" name="gender" className='h-4 w-4 mr-2  text-blue-500 focus:ring-blue-400 border-gray-300'/>
              <span className='text-gray-700'>{gender}</span>
          </div>
            ))}
        </div>

        {/* color filter */}
        <div className="mb-6">
          <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Color</label>
          <div className="flex flex-wrap gap-2">
            {color.map((color)=>(
              <button key={color} name='color'
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border bg-gray-300 cursor-pointer transition hover:scale-105 ${filter.color === color ? "ring-2 ring-blue-500" : ""}`}
              style={{backgroundColor:color.toLocaleLowerCase()}}
              ></button>
            ))}
          </div>
        </div>

        {/* size filter */}
        <div className="mb-6">
          <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Size</label>
          {sizes.map((size)=>(
            <div key={size} className="flex items-center mb-1">
              <input type="checkbox"
               value={size}
               checked={filter.size.includes(size)}
               onClick={handleFilterChange}
              name="size" className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
              <span className='text-gray-700'>{size}</span>
            </div>
          ))}
        </div>


        {/* material filter */}
        <div className="mb-6">
          <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Material</label>
          {materials.map((material)=>(
            <div key={material} className="flex items-center mb-1">
              <input type="checkbox" name="material"
               value={material}
               checked={filter.material.includes(material)}
               onClick={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
              <span className='text-gray-700'>{material}</span>
            </div>
          ))}
        </div>


        {/* brands filter */}
        <div className="mb-6">
          <label htmlFor="" className='block text-gray-600 font-medium mb-2'>Brands</label>
          {brands.map((brand)=>(
            <div key={brand} className="flex items-center mb-1">
              <input type="checkbox" name="brand"
               value={brand}
               checked={filter.brand.includes(brand)}
               onClick={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
              <span className='text-gray-700'>{brand}</span>
            </div>
          ))}
        </div>

          {/* price filter */}
          <div className="mb-8">
            <label htmlFor="range" className='block text-gray-600 font-medium mb-2'>Price Range</label>
            <input 
            type="range"
             name="priceRange"
             min={0}
             max={100}
            //  value={priceRange[1]}
             onClick={handlePriceChange}
             className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
            <div className="flex justify-between text-gray-600 mt-2">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

    </div>
  )
}

export default FilterSideBar
