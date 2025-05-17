import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    const newArrivals = [
        {
            _id:"1",
            name: 'stylish jackets',
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=1",
                    altText:"Stylish Jackets",
                }
            ]
        },
        {
            _id:"2",
            name: 'Pant',
            price:100,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=2",
                    altText:"Pant",
                }
            ]
        },
        {
            _id:"3",
            name: 'Shirt',
            price:50,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=3",
                    altText:"Shirt",
                }
            ]
        },
        {
            _id:"4",
            name: 'stylish jackets',
            price:200,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=4",
                    altText:"Stylish Jackets",
                }
            ]
        },
        {
            _id:"5",
            name: 'Dress',
            price:90,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=5",
                    altText:"Stylish Dress",
                }
            ]
        },
        {
            _id:"6",
            name: ' jackets',
            price:20,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=6",
                    altText:"Stylish Jackets",
                }
            ]
        },
        {
            _id:"7",
            name: 'stylish Shirt new Design',
            price:320,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=7",
                    altText:"Stylish new Shirt",
                }
            ]
        },
        {
            _id:"8",
            name: 'new Design Dress',
            price:900,
            images:[
                {
                    url:"https://picsum.photos/500/500?random=8",
                    altText:"Stylish new Dress",
                }
            ]
        },
    ];

    const handleMouseDown = (e)=>{
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e)=>{
        if(!isDragging) return;
        const  x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft-walk;
    }
    const handleMouseUpOrLeave = (e)=>{
        setIsDragging(false)
    }

    const scroll = (direction)=>{
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({left: scrollAmount, behaviour: "smooth"})
    }

    // update the scroll buttons 
    const updateScrollButtons = ()=>{
        const container = scrollRef.current;

        if(container){
            const LeftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > LeftScroll + container.clientWidth;

            setCanScrollLeft(LeftScroll > 0);
            setCanScrollRight(rightScrollable)
        }
    }

    useEffect(()=> {
        const container = scrollRef.current;
        if(container){
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons();
            return ()=> container.removeEventListener("scroll", updateScrollButtons)
        }
    },[])

  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className="container mx-auto text-center mb-10 relative">
            <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
            <p className=' text-gray-600 mb-9'>Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.</p>

            {/* Scrollbar buttons */}
            <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                <button
                onClick={()=> scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronLeft className='text-2xl'/>
                </button>
                <button 
                onClick={()=> scroll("right")}
                className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronRight className='text-2xl'/>
                </button>
            </div>
        </div>

    {/* Scrollable Contents */}
    <div ref={scrollRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUpOrLeave}
    onMouseLeave={handleMouseUpOrLeave}
    className={`container mx-auto overflow-x-auto flex space-x-6 relative ${isDragging ? " cursor-grabbing  ":"cursor-grab"}`}>
        {newArrivals.map((product,index)=>(
            <div className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative" key={index}>
                <img src={product.images[0]?.url} alt={product.images[0]?.altText|| product.name}
                draggable="false"
                className='w-full h-[400px] object-cover rounded-lg' />
                <div className="absolute left-0 right-0 bottom-0 bg-opacity/50 backdrop-blur-md text-white p-4 rounded-lg">
                <Link to={`/product/${product._id}`} className='block'>
                <h4 className='font-medium'>{product.name}</h4>
                <p className='mt-1 '>${product.price}</p>
                </Link>
                </div>
            </div>
        ))}
    </div>

    </section>
  )
}

export default NewArrivals
