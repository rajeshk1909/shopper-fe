"use client"
import Link from "next/link"
import React, { useState } from "react"

const Slidebar = () => {
  const [open, setOpen] = useState<boolean>(false)

  console.log(open)

  return (
    <div className='w-full md:h-[100vh] sticky top-0 shadow-xl h-20 p-5 text-white bg-black flex md:flex-col md:justify-normal justify-between'>
      <Link href='/admin'>logo</Link>

      <div className='md:mt-10 hidden md:flex md:flex-col md:space-y-6'>
        <Link href='/admin/addproduct' className='border-none'>
          Add Product
        </Link>
        <Link href='/admin/products' className='border-none'>
          Manage Product
        </Link>
      </div>

      <button className='md:hidden flex' onClick={() => setOpen(!open)}>
        menu
      </button>
    </div>
  )
}

export default Slidebar
