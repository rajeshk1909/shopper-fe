import AdminHeader from "@/components/AdminHeader"
import Slidebar from "@/components/Slidebar"
import React from "react"

type layoutProps = {
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className='w-full flex flex-col md:flex-row'>
      <div className='md:fixed md:w-64 w-full sticky z-50 top-0'>
        <Slidebar />
      </div>

      <div className='w-full md:ml-64 md:overflow-y-auto'>
        <AdminHeader />
        {children}
      </div>
    </div>
  )
}

export default layout
