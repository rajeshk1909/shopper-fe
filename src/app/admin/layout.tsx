"use client"
import AdminHeader from "@/components/AdminHeader"
import Slidebar from "@/components/Slidebar"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

type layoutProps = {
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter()

  const adminData = useSelector((state: RootState) => state.user.admin)
  const userData = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    if (!adminData && !userData) {
      router.push("/adminlogin")
    } else if (userData) {
      router.back()
    }
  })

  if (!adminData) {
    return null
  }

  return (
    <div className='w-full flex flex-col md:flex-row'>
      <div className='md:fixed md:w-64 w-full sticky z-50 top-0'>
        <Slidebar />
      </div>

      <div className='w-full md:ml-64 md:overflow-y-auto'>
        <AdminHeader adminData={adminData} />
        {children}
      </div>
    </div>
  )
}

export default layout
