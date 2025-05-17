import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';

const selectedProducts = {
    name : "Stylish Jacket",
    price : 120,
    originalPrice:150,
    description: "This is a stylish jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes:["S","M","L","XL"],
    colors:["red", "black"],
    images:[
        {
            url: "https://picsum.photos/500/500?random=1",
            altText: "Stylish Jacket 1",
        },
        {
            url: "https://picsum.photos/500/500?random=2",
            altText: "Stylish Jacket 2",
        },
    ]
}

const similarProducts =[
    {
        _id :1,
        name: "Product 1",
        price:100,
        images:[
            {
                url:"https://picsum.photos/500/500?random=3",
            }
        ]
    },
    {
        _id :2,
        name: "Product 2",
        price:100,
        images:[
            {
                url:"https://picsum.photos/500/500?random=4",
            }
        ]
    },
    {
        _id :3,
        name: "Product 3",
        price:100,
        images:[
            {
                url:"https://picsum.photos/500/500?random=5",
            }
        ]
    },
    {
        _id :4,
        name: "Product 4",
        price:100,
        images:[
            {
                url:"https://picsum.photos/500/500?random=6",
            }
        ]
    },
]

const ProductDetails = () => {

    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

   

    useEffect(()=>{
        if(selectedProducts?.images?.length > 0){
            setMainImage(selectedProducts.images[0].url);
        }
    }, [selectedProducts]);

    const handleQuantityChange = (action)=>{
        if(action === "plus") setQuantity((prev)=> prev+1);
        if(action === "minus" && quantity>1) setQuantity((prev)=> prev-1);
    }

    const handleAddToCart = ()=>{
        if(!selectedSize || !selectedColor){
            toast.error("Please Select a Size and Color before adding to cart.!",{
                duration:1000,
            });
            return;
        }

        setIsButtonDisabled(true);

        setTimeout(() => {
            toast.success("Product added to Cart!",{
                duration:1000,
            });
            setIsButtonDisabled(false)
        },500);
    }

  return (

    <div className='p-6'>
        <div className="max-w-6xl mx-auto rounded-lg bg-white ">
            <div className="flex flex-col md:flex-row">
                {/* left thumbnails */}
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                    {selectedProducts.images.map((image, index)=>(
                        <img src={image.url} alt={image.altText} key={index}
                        onClick={()=> setMainImage(image.url)}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black":"border-gray-300"}`}/>
                    ))}
                </div>
                {/* main image */}
                <div className="md:w-1/2">
                    <div className="mb-4">
                        <img src={mainImage} alt="Product"
                        className='w-full h-auto object-cover rounded-lg'
                        />
                    </div>
                </div>
                {/* mobile thumbnail */}
                <div className="md:hidden  flex overscroll-x-scroll space-x-4 mb-4">
                {selectedProducts.images.map((image, index)=>(
                        <img src={image.url} 
                        alt={image.altText}
                         key={index}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black":"border-gray-300"}`}
                        onClick={()=> setMainImage(image.url)}/>
                    ))} 
                </div>
                {/* Right side */}
                <div className="md:w-1/2 md:ml-10">
                    <h1 className='text-2xl  md:text-3xl font-semibold mb-2'>
                        {selectedProducts.name}
                    </h1>
                    <p className='text-lg text-gray-600 mb-1 line-through'>{selectedProducts.originalPrice && `${selectedProducts.originalPrice}`} </p>
                    <p className='text-xl text-gray-500 mb-2'>${selectedProducts.price}</p>
                    <p className='text-xl text-gray-500 mb-2'>{selectedProducts.description}</p>
                    <div className="mb-4">
                        <p className='text-gray-700'>Colors:</p>
                        <div className="flex gap-2 mt-2">
                            {selectedProducts.colors.map((color)=>(
                                <button 
                                key={color} 
                                onClick={()=> setSelectedColor(color)} 
                                className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black ":"border-gray-300"}`}
                                style={{
                                    backgroundColor:color.toLocaleLowerCase(),
                                    filter:"brightness(0.5)"
                                }}
                                ></button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className='text-gray-700'>Sizes:</p>
                        <div className="flex gap-2 mt-2">
                            {selectedProducts.sizes.map((size,index)=>(
                                <button key={index} 
                                onClick={()=> setSelectedSize(size)}
                                className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white": ""}`}>{size}</button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className='text-gray-700'>Quantity:</p>
                        <div className="flex items0-center space-x-4 mt-2">
                            <button 
                            onClick={()=> handleQuantityChange("minus")}
                            className='px-2 py-1 bg-gray-200 rounded text-lg'>-</button>
                            <span className='text-lg'>{quantity}</span>
                            <button
                             onClick={()=> handleQuantityChange("plus")}
                            className='px-2 py-1 bg-gray-200 rounded text-lg'>+</button>
                        </div>
                    </div> 

                    <button
                    onClick={handleAddToCart}
                    disabled={isButtonDisabled}
                    className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50": "hover:bg-gray-900"}`}>
                        {isButtonDisabled? "Adding...":"ADD TO CART"}
                    </button>

                    <div className="mt-10 text-gray-700">
                        <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
                        <table className="w-full text-left text-sm text-gray-600">
                            <tbody>
                                <tr>
                                    <td className='py-1'>Brand</td>
                                    <td className='py-1'>{selectedProducts.brand}</td>
                                </tr>
                                <tr>
                                    <td className='py-1'>Material</td>
                                    <td className='py-1'>{selectedProducts.material}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                <ProductGrid products={similarProducts}/>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
