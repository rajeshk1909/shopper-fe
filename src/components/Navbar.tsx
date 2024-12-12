"use client"
import React, { useEffect, useState } from "react"
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

  return (
    <div className='flex items-center justify-between py-6 px-10 bg-[#ededf0]'>
      <Link href='/'>
        <Image src={logo} alt='Logo' className='h-10 w-10' />
      </Link>
      {/* Large Screen */}
      <div className='space-x-7 md:flex hidden'>
        {menuItems.map((nav: menuItemsType, index: number) => (
          <Link
            key={index}
            href={nav.to}
            className={`${
              activeIndex === nav.label ? "text-blue-600" : "text-[#555]"
            }`}>
            {nav.label}
          </Link>
        ))}
      </div>
      <div className='md:flex items-center space-x-7 hidden'>
        <Link href='/cart' passHref>
          <Badge badgeContent={1} color='primary'>
            <MdAddShoppingCart
              className={`w-6 h-6 ${
                activeIndex === "Cart" ? "text-blue-800" : "text-[#555]"
              }`}
            />
          </Badge>
        </Link>

        <Link href='/wishlist' passHref>
          <Badge badgeContent={4} color='primary'>
            <FaRegHeart
              className={`w-5 h-5 ${
                activeIndex === "Wishlist" ? "text-blue-800" : "text-[#555]"
              }`}
            />
          </Badge>
        </Link>

        <Link href='/login'>
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
