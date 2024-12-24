"use client"
import Navbar from "@/components/Navbar"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()

  const userData = useSelector((state: RootState) => state.user.user)
  const adminData = useSelector((state: RootState) => state.user.admin)

  useEffect(() => {
    if (!userData && !adminData) {
      router.push("/login")
    } else if (adminData) {
      router.back()
    }
  }, [userData, router, adminData])

  if (!userData) {
    return null
  }

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
