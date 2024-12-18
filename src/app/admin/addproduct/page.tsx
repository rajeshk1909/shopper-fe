"use client"
import React, { useState } from "react"
import upload_area from "../../../../public/upload_area.svg"
import Image from "next/image"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import api from "@/Utility/axiosInstance"
import { RiLoader2Fill } from "react-icons/ri"
import { useToast } from "@/context/ToastProvider"

const categories = ["men", "women", "kids"]

interface FormData {
  name: string
  price: number
  discountPercentage: number
  starRating: number
  category: string
}

const AddProduct = () => {
  const { showToast } = useToast()

  const [image, setImage] = useState<File | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    discountPercentage: 0,
    starRating: 0,
    category: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [productLoading, setProductLoading] = useState<boolean>(false)

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) {
      showToast("info", "Please select an image")
      return
    } else if (uploadedImage) {
      showToast("info", "Image already uploaded")
      return
    }

    setLoading(true)

    try {
      const response = await api.post(
        "/api/upload",
        { product: image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      if (response.status !== 200) {
        return showToast("info", response.data.message)
      }

      setUploadedImage(response.data.image_url)
      showToast("success", response.data.message)
    } catch (error) {
      showToast("error", "Failed to upload image")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const validate = () => {
    if (!formData.name) {
      showToast("info", "Please enter a product title")
      return false
    } else if (formData.price === 0) {
      showToast("info", "Please enter the product price")
      return false
    } else if (formData.discountPercentage === 0) {
      showToast("info", "Please enter the discount percentage")
      return false
    } else if (formData.discountPercentage >= 100) {
      showToast("info", "Please enter a valid discount percentage")
      return false
    } else if (!formData.category) {
      showToast("info", "Please select a category")
      return false
    } else if (formData.starRating === 0) {
      showToast("info", "Please provide a star rating")
      return false
    } else if (formData.starRating > 5) {
      showToast("info", "Star rating must be less than 5")
      return false
    }
    return true
  }

  const AddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    if (!uploadedImage) {
      showToast("info", "Please upload an image first")
      return
    }

    try {
      setProductLoading(true)
      const response = await api.post("/api/products", {
        name: formData.name,
        price: Number(formData.price),
        discountPercentage: Number(formData.discountPercentage),
        category: formData.category,
        starRating: Number(formData.starRating),
        image: uploadedImage,
      })
      if (response.status === 201) {
        showToast("success", "Product added successfully")
        setFormData({
          name: "",
          price: 0,
          discountPercentage: 0,
          starRating: 0,
          category: "",
        })
        setUploadedImage(null)
      } else {
        showToast("error", "Failed to add product")
      }
    } catch (error) {
      showToast("error", "Failed to add product")
      console.error(error)
    } finally {
      setProductLoading(false)
    }
  }

  return (
    <div className='box-border px-[10%] py-10 rounded-md bg-white'>
      <form>
        <div className='space-y-4'>
          <Input
            label='Product Title'
            name='name'
            type='text'
            handleChange={changeHandler}
          />
          <Input
            label='Price'
            name='price'
            type='number'
            handleChange={changeHandler}
          />
          <Input
            label='Discount Percentage'
            name='discountPercentage'
            type='number'
            handleChange={changeHandler}
          />
          <Input
            label='Star Rating'
            name='starRating'
            type='number'
            handleChange={changeHandler}
          />
        </div>

        <div className='w-full text-[#7b7b7b] my-7 flex gap-5 items-center text-base'>
          <label htmlFor='category'>Product Category</label>
          <select
            value={formData.category}
            onChange={changeHandler}
            name='category'
            id='category'
            className='p-[10px] w-[200px] h-[50px] outline-none text-sm text-[#7b7b7b] border border-[#7b7b7b8d] rounded'>
            <option value='' disabled>
              Select Category
            </option>
            {categories.map((value, index) => (
              <option value={value} key={index} className='capitalize'>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-10'>
          <div className='my-3 overflow-hidden'>
            <label htmlFor='file-input' className='cursor-pointer'>
              <Image
                src={image ? URL.createObjectURL(image) : upload_area}
                alt={image ? "Uploaded Image Preview" : "Upload Product Image"}
                height={120}
                width={120}
                className='object-contain rounded-md'
                unoptimized
              />
              <input
                onChange={imageHandler}
                type='file'
                name='image'
                id='file-input'
                accept='image/*'
                className='hidden'
              />
            </label>
          </div>
          <Button
            onClick={uploadImage}
            variant='primary'
            className='md:w-[300px]'>
            {loading ? (
              <span className='text-xl animate-spin'>
                <RiLoader2Fill />
              </span>
            ) : (
              <p>Upload Image</p>
            )}
          </Button>
        </div>

        <Button variant='secondary' onClick={AddProduct} className='w-full'>
          {productLoading ? (
            <span className='text-xl animate-spin'>
              <RiLoader2Fill />
            </span>
          ) : (
            <p>Add Product</p>
          )}
        </Button>
      </form>
    </div>
  )
}

export default AddProduct
