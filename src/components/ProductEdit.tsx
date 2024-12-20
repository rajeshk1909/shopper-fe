import * as React from "react"
import { ProductsDataTypes } from "@/app/admin/products/page"
import { Input } from "./Input"
import api from "@/Utility/axiosInstance"
import { useToast } from "@/context/ToastProvider"
import { Dialog } from "@mui/material"
import { motion } from "framer-motion"
import { Button } from "./Button"

interface ProductEditModalPropsTypes {
  open: boolean
  handleClose: () => void
  updateProduct: (updatedProduct: ProductsDataTypes) => void
  product: ProductsDataTypes | null
}

interface formdata {
  _id: string
  name: string
  price: number
  discountPercentage: number
  starRating: number
  image: string
  categories: string
  discountPrice: number
}

const ProductEditModal: React.FC<ProductEditModalPropsTypes> = ({
  open,
  handleClose,
  product,
  updateProduct,
}) => {
  const { showToast } = useToast()
  const [formdata, setFormData] = React.useState<formdata>({
    _id: "",
    name: "",
    price: 0,
    discountPercentage: 0,
    starRating: 0,
    image: "",
    categories: "",
    discountPrice: 0,
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    if (product) {
      setFormData({
        _id: product._id || "",
        name: product.name || "",
        price: product.price || 0,
        discountPercentage: product.discountPercentage || 0,
        starRating: product.starRating || 0,
        image: product.image || "",
        categories: product.category || "",
        discountPrice:
          product.price - product.price * (product.discountPercentage / 100) ||
          0,
      })
    }
  }, [product])

  const validation = () => {
    return (
      formdata.name !== product?.name ||
      formdata.price !== product?.price ||
      formdata.discountPercentage !== product?.discountPercentage ||
      formdata.starRating !== product?.starRating
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validation()) return

    try {
      const newPrice =
        formdata.price - formdata.price * (formdata.discountPercentage / 100)

      const updatedProduct: ProductsDataTypes = {
        _id: formdata._id,
        name: formdata.name,
        price: Math.floor(formdata.price),
        discountPercentage: Math.floor(formdata.discountPercentage),
        starRating: Math.floor(formdata.starRating),
        image: formdata.image,
        category: formdata.categories,
        discountPrice: Math.floor(newPrice),
      }

      const response = await api.put(
        `/api/products/${formdata._id}`,
        updatedProduct
      )

      if (response.status === 200) {
        showToast("success", "Product Data Updated")
        updateProduct(updatedProduct)
        handleClose()
      }
    } catch (error) {
      console.error("Error updating product:", error)
      showToast("error", "Failed to update product")
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      className='backdrop-blur-sm'>
      <div
        className='bg-white pb-10 px-10 rounded-md shadow-lg'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-end py-6 items-center'>
          <motion.button
            onClick={handleClose}
            className='text-gray-500 hover:text-gray-800 transition duration-200'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            ✕
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <h1 className='text-center font-bold text-xl font-lexend'>
            MAKE YOUR CHANGES
          </h1>

          <Input
            label='Product Title'
            name='name'
            type='text'
            value={formdata.name}
            handleChange={changeHandler}
          />
          <Input
            label='Price'
            name='price'
            type='number'
            value={formdata.price.toString()}
            handleChange={changeHandler}
          />
          <Input
            label='Discount Percentage'
            name='discountPercentage'
            type='number'
            value={formdata.discountPercentage.toString()}
            handleChange={changeHandler}
          />
          <Input
            label='Star Rating'
            name='starRating'
            type='number'
            value={formdata.starRating.toString()}
            handleChange={changeHandler}
          />
          <Button className="w-full mt-10">Save</Button>
        </form>
      </div>
    </Dialog>
  )
}

export default ProductEditModal
