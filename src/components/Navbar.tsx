"use client"
import React, { useContext, useEffect, useState } from "react"
import logo from "../../public/logo.png"
import Image from "next/image"
import Link from "next/link"
import Badge from "@mui/material/Badge"
import {
  MdHome,
  MdMale,
  MdFemale,
  MdChildCare,
  MdAddShoppingCart,
  MdOutlineLogout,
} from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"
import { RiMenuUnfold4Line, RiMenuFold4Line } from "react-icons/ri"
import MobileNavbar from "./MobileNavbar"
import { usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { clearUser } from "@/store/features/userSlice"
import { DataContext } from "@/context/DataProvider"
import { motion } from "framer-motion"

export type menuItemsType = {
  label: string
  icon: React.JSX.Element
  to: string
}

export type userItemsTypes = {
  label: string
  icon: React.JSX.Element
  to: string
}

const menuItems: menuItemsType[] = [
  { label: "Home", icon: <MdHome />, to: "/" },
  { label: "Men", icon: <MdMale />, to: "/men" },
  { label: "Women", icon: <MdFemale />, to: "/women" },
  { label: "Kids", icon: <MdChildCare />, to: "/kids" },
]

const userActions: userItemsTypes[] = [
  { label: "Cart", icon: <MdAddShoppingCart />, to: "/cart" },
  { label: "Wishlist", icon: <FaRegHeart />, to: "/wishlist" },
  { label: "Logout", icon: <MdOutlineLogout />, to: "/login" },
]

const Navbar: React.FC = () => {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error(
      "ProductsContainer must be used within a DataContextProvider"
    )
  }

  const { cartItems, wishlistItems } = dataContext
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<string | undefined>()

  const pathname = usePathname()

  useEffect(() => {
    const path =
      menuItems.find((item) => item.to === pathname) ||
      userActions.find((item) => item.to === pathname)
    setActiveIndex(path?.label)
  }, [pathname])

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    dispatch(clearUser())
  }

  return (
    <div className='flex items-center z-50 justify-between py-4 px-10 sticky top-0  bg-white/80 backdrop-blur-md'>
      <Link href='/'>
        <Image src={logo} alt='Logo' className='h-10 w-10' />
      </Link>
      {/* Large Screen */}
      <div className='space-x-7 md:flex hidden'>
        {menuItems.map((item: menuItemsType, index: number) => (
          <Link key={index} href={item.to}>
            <motion.div
              className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                activeIndex === item.label
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              {item.icon}
              <span className='text-sm font-medium'>{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className='md:flex items-center space-x-7 hidden'>
        <Link href='/cart' passHref>
          <Badge badgeContent={cartItems.length} color='primary'>
            <MdAddShoppingCart
              className={`w-6 h-6 ${
                activeIndex === "Cart" ? "text-blue-800" : "text-[#555]"
              }`}
            />
          </Badge>
        </Link>

        <Link href='/wishlist' passHref>
          <Badge badgeContent={wishlistItems.length} color='primary'>
            <FaRegHeart
              className={`w-5 h-5 ${
                activeIndex === "Wishlist" ? "text-blue-800" : "text-[#555]"
              }`}
            />
          </Badge>
        </Link>

        <Link onClick={handleLogout} href='/login'>
          <MdOutlineLogout className='w-6 h-6 text-gray-800' />
        </Link>
      </div>
      {/* Mobile Screen */}
      <button
        className='text-2xl flex md:hidden'
        onClick={() => toggleDrawer()}>
        {open ? <RiMenuUnfold4Line /> : <RiMenuFold4Line />}
      </button>

      <MobileNavbar
        open={open}
        toggleDrawer={toggleDrawer}
        userActions={userActions}
        menuItems={menuItems}
        activeIndex={activeIndex}
      />
    </div>
  )
}

export default Navbar
