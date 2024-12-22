"use client"
import { ListItem, ListItemButton } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import logo from "../../public/admin_logo.svg"
import { FaTachometerAlt, FaPlusCircle, FaClipboardList } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri"
import MobileNavbar from "./MobileNavbar"
import { FaUserPlus } from "react-icons/fa6"
import { MdOutlineLogout } from "react-icons/md"
import { useDispatch } from "react-redux"
import { clearUser } from "@/store/features/userSlice"

type menuItemsType = {
  label: string
  icon: React.JSX.Element
  to: string
}

const menuItems: menuItemsType[] = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Add Product",
    to: "/admin/addproduct",
    icon: <FaPlusCircle />,
  },
  {
    label: "Manage Product",
    to: "/admin/products",
    icon: <FaClipboardList />,
  },
  {
    label: "Admin Register",
    to: "/adminregister",
    icon: <FaUserPlus />,
  },
  { label: "Logout", to: "/login", icon: <MdOutlineLogout /> },
]

const Slidebar: React.FC = () => {
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState<string | undefined>()
  const [open, setOpen] = useState<boolean>(false)

  const pathname = usePathname()

  useEffect(() => {
    const path = menuItems.find((item) => item.to === pathname)
    setActiveIndex(path?.label)
  }, [pathname])

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    dispatch(clearUser())
  }

  return (
    <div className='w-full md:h-[100vh] shadow-xl z-50 py-[18px] md:py-0 bg-white md:px-0 px-7 text-[#f4f4f6] flex md:flex-col md:justify-normal justify-between items-center md:items-stretch'>
      {/* Header Section */}
      <div className='flex justify-center items-center md:py-8 bg-white md:border-b md:border-[#e0e0e0] '>
        <Image src={logo} alt='Logo' width={150} height={150} />
      </div>

      {/* Main Navigation */}
      <div className='my-5 md:space-y-2 z-[999] md:block hidden'>
        {menuItems.map((item: menuItemsType, index: number) => (
          <ListItem
            key={index}
            className={`  py-1 ${
              activeIndex === item.label
                ? "border-l-4 border-[#4a90e2] bg-blue-100 font-semibold text-[#4a90e2]"
                : "border-none text-[#777]"
            }`}
            disablePadding>
            <Link href={item.to} className='w-full px-3 md:px-0'>
              <ListItemButton
                onClick={
                  item.label === "Logout" ? handleLogout : undefined
                }
                className='flex gap-5'>
                <span className='text-[#4a90e2] text-2xl'>{item.icon}</span>
                <p>{item.label}</p>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </div>

      {/* Mobile Screen */}
      <button
        className='text-2xl flex md:hidden text-[#444]'
        onClick={() => toggleDrawer()}>
        {open ? <RiMenuUnfold4Line /> : <RiMenuFold4Line />}
      </button>

      <MobileNavbar
        open={open}
        toggleDrawer={toggleDrawer}
        menuItems={menuItems}
        activeIndex={activeIndex}
      />
    </div>
  )
}

export default Slidebar
