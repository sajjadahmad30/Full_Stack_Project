import React, { useState } from 'react'
import {FaBars} from 'react-icons/fa'
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSlidbar =()=>{
        setSidebarOpen(!isSidebarOpen);
    }

  return (
   <div className="flex flex-col md:flex-row relative min-h-screen">
    {/* mobile toggle buttons */}
    <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSlidbar}>
            <FaBars size={24}/>
        </button>
            <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
    </div>

    {/* overlay for mobile sidbar */}
    {isSidebarOpen && (
        <div className="fixed inset-0 z-10  bg-black/50 md:hidden "
        onClick={toggleSlidbar }></div>
    )}

    {/* sidbar */}
    <div className={`bg-gray-900 min-h-screen w-64 text-white absolute md:relative transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static  md:block z-20`}>
        {/* sidebar components */}
        <AdminSidebar/>
    </div>

    {/* Main content */}
    <div className="flex-grow p-6 overflow-auto">
        <Outlet/>
    </div>

   </div>
  );
};

export default AdminLayout
