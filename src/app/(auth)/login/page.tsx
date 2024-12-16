import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Shield } from "lucide-react"
import Link from "next/link"
import React from "react"

const Login = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center mb-4'>
          <Shield className='w-12 h-12 text-blue-600 animate-bounce' />
        </div>
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center gap-2 flex justify-center font-lexend font-medium text-sm text-gray-600'>
          Or
          <Link
            href='/register'
            className='font-medium text-blue-600 hover:text-blue-500'>
            create a new account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10'>
          <form className='space-y-6'>
            <Input
              label='Email address'
              type='email'
              name='email'
              // handleChange={handleChange}
              // value={formData.email}
              // error={!!errors.email}
              // errorMessage={errors.email}
            />

            <Input
              label='Password'
              type='password'
              // handleChange={handleChange}
              // value={formData.password}
              // error={!!errors.password}
              // errorMessage={errors.password}
              name='password'
            />

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105'>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
