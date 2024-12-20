import React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import { MdClose } from "react-icons/md"
import Image from "next/image"
import logo from "../../public/logo.png"
import { menuItemsType, userItemsTypes } from "./Navbar"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { clearUser } from "@/store/features/userSlice"
import { LogOut } from "lucide-react"

type MobileNavbarProps = {
  open: boolean
  toggleDrawer: (open: boolean) => void
  userActions?: userItemsTypes[]
  menuItems: menuItemsType[]
  activeIndex: string | undefined
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  open,
  toggleDrawer,
  userActions,
  menuItems,
  activeIndex,
}) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
  }

  return (
    <Drawer anchor='left' open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f4f4f6",
        }}
        role='presentation'>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
            bgcolor: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
          }}>
          <Image src={logo} alt='Logo' width={40} height={40} />
          <IconButton onClick={() => toggleDrawer(false)}>
            <MdClose size={24} />
          </IconButton>
        </Box>

        {/* Main Navigation */}
        <div className='my-5'>
          {menuItems.map((item: menuItemsType, index: number) => (
            <ListItem
              key={index}
              className={` py-1 my-1 ${
                activeIndex === item.label
                  ? "border-l-4 border-[#4a90e2] bg-blue-100 font-semibold text-[#4a90e2]"
                  : "border-none text-[#777]"
              }`}
              disablePadding>
              <Link
                href={item.to}
                className='w-full px-3'
                onClick={() => {
                  toggleDrawer(false)
                }}>
                <ListItemButton
                  className='flex gap-5'
                  onClick={
                    item.label === "Logout" ? handleLogout : undefined
                  }>
                  <span className='text-[#4a90e2] text-2xl'>{item.icon}</span>
                  <p>{item.label}</p>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </div>

        <Divider />

        {/* User Actions */}
        <div className='mt-5'>
          {userActions?.map((action: userItemsTypes, index: number) => (
            <ListItem
              key={index}
              className={`py-1 my-1 ${
                activeIndex === action.label
                  ? "border-l-4 border-[#f56c6c] bg-red-100 font-semibold text-[#f56c6c]"
                  : "border-none text-[#777]"
              }`}
              disablePadding>
              <Link
                href={action.to}
                className='w-full px-3'
                onClick={() => {
                  toggleDrawer(false)
                }}>
                <ListItemButton
                  className='flex gap-5 px-10'
                  onClick={
                    action.label === "Logout" ? handleLogout : undefined
                  }>
                  <span className=' text-xl font-bold text-[#f56c6c]'>
                    {action.icon}
                  </span>
                  <p>{action.label}</p>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </div>
      </Box>
    </Drawer>
  )
}

export default MobileNavbar
