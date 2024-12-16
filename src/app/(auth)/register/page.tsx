"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { useToast } from "@/context/ToastProvider"
import api from "@/Utility/axiosInstance"
import { Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { RiLoader2Fill } from "react-icons/ri"

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface Errors {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const AdminRegister: React.FC = () => {
  const router = useRouter()
  const { showToast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

    const newErrors: Errors = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof Errors] = ""
      return acc
    }, {} as Errors)

    if (!formData.name) newErrors.name = "Full Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const response = await api.post("/api/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 201 && response.data.success) {
        showToast("success", response.data.message)
        router.push("/login")
      } else {
        showToast("info", response.data.message)
      }
    } catch (error: any) {
      if (error.response) {
        showToast("error", error.response.data.message)
      } else {
        showToast("error", "An unknown error occurred")
      }
    }
  }

  return (
    <div className='h-[100vh] bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center mb-4'>
          <Shield className='w-12 h-12 text-blue-600 animate-bounce' />
        </div>
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>
          Create New Account
        </h2>
        <p className='mt-2 text-center gap-2 flex justify-center font-lexend font-medium text-sm text-gray-600'>
          Already have an account?
          <Link
            href='/login'
            className='font-medium text-blue-600 hover:text-blue-500'>
            Sign in
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input
              label='Full Name'
              type='name'
              value={formData.name}
              handleChange={handleChange}
              error={!!errors.name}
              errorMessage={errors.name}
              name='name'
            />

            <Input
              label='Email address'
              type='email'
              handleChange={handleChange}
              value={formData.email}
              name='email'
              error={!!errors.email}
              errorMessage={errors.email}
            />

            <Input
              label='Password'
              type='password'
              handleChange={handleChange}
              value={formData.password}
              error={!!errors.password}
              errorMessage={errors.password}
              name='password'
            />

            <Input
              label='Confirm Password'
              type='password'
              handleChange={handleChange}
              value={formData.confirmPassword}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              name='confirmPassword'
            />

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105'>
              {loading ? (
                <span className='text-xl animate-spin'>
                  <RiLoader2Fill />
                </span>
              ) : (
                <p>Create Account</p>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminRegister
