"use client"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import React, { createContext, useEffect, useState } from "react"

type UserDataType = {
  name: string
  email: string
  role: "user"
  token: string
  id: string
  isLogin: boolean
} | null

const UserDataContext = createContext<UserDataType>(null)

type layoutProps = {
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {
  const router = useRouter()
  const [userData, setUserData] = useState<UserDataType>(null)

  useEffect(() => {
    const data = localStorage.getItem("userData")
    if (data) {
      try {
        setUserData(JSON.parse(data))
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error)
      }
    } else {
      router.push("/login")
    }
  }, [])

  return (
    <UserDataContext.Provider value={userData}>
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
    </UserDataContext.Provider>
  )
}

export default layout
