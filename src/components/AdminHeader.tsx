"use client"

import React from "react"
import { Search, Bell } from "lucide-react"
import { AdminData } from "@/types/dataTypes"

interface AdminHeaderPropsTypes {
  adminData : AdminData
}

const AdminHeader: React.FC<AdminHeaderPropsTypes> = ({ adminData }) => {

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className='sticky top-0 bg-gray-50 shadow-md z-40 border-b'>
      <div className='flex items-center justify-between h-20 px-8'>
        <div className='flex items-center gap-6'>
          <h1 className='md:text-3xl text-xl font-extrabold capitalize text-gray-800 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'>
            Welcome, {adminData?.name ? adminData.name : "Admin"}
          </h1>
        </div>

        <div className='flex items-center gap-6'>
          <div className='relative hidden lg:block'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
            <input
              placeholder='Search...'
              className='w-[250px] pl-10 pr-4 py-2 text-sm rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />
          </div>

          <button className='relative'>
            <Bell className='h-6 w-6 text-gray-600 transition-transform hover:scale-110' />
            <span className='absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full'>
              3
            </span>
          </button>

          <div className='h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-semibold'>
            {adminData?.name ? getInitials(adminData.name) : "JD"}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
