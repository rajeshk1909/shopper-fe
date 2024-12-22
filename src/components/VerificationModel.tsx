"use client"

import React from "react"
import { Dialog } from "@mui/material"
import { motion } from "framer-motion"
import { Input } from "./Input"
import { Button } from "./Button"
import { useToast } from "@/context/ToastProvider"

interface ProductDetailModalProps {
  open: boolean
  onClose: () => void
  setIsAdminValidate: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormData {
  password: string
}

export const VerificationModel = ({
  open,
  onClose,
  setIsAdminValidate,
}: ProductDetailModalProps) => {
  const { showToast } = useToast()

  const [formdata, setFormData] = React.useState<FormData>({
    password: "",
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()

    const adminSecretKey = process.env.NEXT_PUBLIC_ADMIN_SECRT_KEY

    if (formdata.password.length < 6) {
      onClose()
      showToast("error", "Invalid secret key, please try again.")
      setFormData({ password: "" })
      return
    }

    if (formdata.password === adminSecretKey) {
      setIsAdminValidate(true)
      showToast(
        "success",
        "Admin authenticated successfully, you can manage products."
      )
      setFormData({ password: "" })
    } else {
      showToast("error", "Invalid secret key, please try again.")
      setFormData({ password: "" })
    }
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      className='backdrop-blur-sm'>
      <div className='flex justify-end items-center pr-6 pt-5'>
        <motion.button
          onClick={onClose}
          className='text-gray-500 hover:text-gray-800 transition duration-200'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          ✕
        </motion.button>
      </div>
      <motion.div
        className='bg-white rounded-lg p-6 max-h-[90vh] font-lexend pt-10 pb-20 flex flex-col overflow-hidden'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
        <form className='space-y-10' onSubmit={handleVerify}>
          <h2 className='text-xl text-center font-bold  mb-4'>
            Admin Verification
          </h2>
          <Input
            name='password'
            label='Enter the Admin Secret Key'
            type='password'
            value={formdata.password}
            handleChange={changeHandler}
          />

          <Button type='submit' className='w-full'>
            Verify
          </Button>
        </form>
      </motion.div>
    </Dialog>
  )
}

export default VerificationModel
