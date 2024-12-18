"use client"
import Slidebar from "@/components/Slidebar"
import { useRouter } from "next/navigation"
import React, { createContext, useEffect, useState } from "react"

type AdminData = {
  name: string
  id: string
  email: string
  isLogin: boolean
  role: "admin"
  token: string
} | null

type layoutProps = {
  children: React.ReactNode
}

const AdminDataContext = createContext<AdminData>(null)

const layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter()

  const [adminData, setAdminData] = useState<AdminData>(null)

  useEffect(() => {
    const data = localStorage.getItem("adminData")
    if (data) {
      try {
        setAdminData(JSON.parse(data))
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error)
      }
    } else {
      router.push("/login")
    }
  }, [])

  return (
    <AdminDataContext.Provider value={adminData}>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='md:fixed md:w-64 w-full sticky top-0'>
          <Slidebar />
        </div>
        <div className='w-full md:ml-64 md:overflow-y-auto'>{children}</div>
      </div>
    </AdminDataContext.Provider>
  )
}

export default layout
