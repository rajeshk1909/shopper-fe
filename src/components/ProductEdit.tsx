import * as React from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import { ProductsDataTypes } from "@/app/admin/products/page"
import { Input } from "./Input"
import api from "@/Utility/axiosInstance"
import { useToast } from "@/context/ToastProvider"

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
        price: formdata.price,
        discountPercentage: formdata.discountPercentage,
        starRating: formdata.starRating,
        image: formdata.image,
        category: formdata.categories,
        discountPrice: newPrice,
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div
          className='space-y-4 w-[600px] bg-white py-10 px-10 rounded-md shadow-lg'
          onClick={(e) => e.stopPropagation()}>
          <h1 className='text-center pb-5 text-red-500'>Edit your products</h1>
          <form onSubmit={handleSubmit}>
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
            <div className='flex items-center pt-5 justify-center gap-10'>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default ProductEditModal
