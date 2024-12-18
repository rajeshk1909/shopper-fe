"use client"
import Slidebar from "@/components/Slidebar"
import React, { createContext, useEffect, useState } from "react"

type layoutProps = {
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className='w-full flex flex-col md:flex-row'>
      <div className='md:fixed md:w-64 w-full sticky top-0'>
        <Slidebar />
      </div>
      <div className='w-full md:ml-64 md:overflow-y-auto'>{children}</div>
    </div>
  )
}

export default layout
