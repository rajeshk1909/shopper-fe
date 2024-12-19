"use client"
import Loader from "@/components/Loader"
import ProductEditModal from "@/components/ProductEdit"
import { useToast } from "@/context/ToastProvider"
import api from "@/Utility/axiosInstance"
import React, { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { MdDelete } from "react-icons/md"

export interface ProductsDataTypes {
  _id: string
  image: string
  name: string
  category: string
  discountPrice: number
  discountPercentage: number
  price: number
  starRating: number
}

const ManageProducts = () => {
  const { showToast } = useToast()
  const [productsData, setProductsData] = useState<ProductsDataTypes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const [productEditData, setProductsEditData] =
    useState<ProductsDataTypes | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/products")

        if (response.status === 200) {
          setProductsData(response.data.products)
        } else {
          console.log("Failed to fetch data")
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleRemove = async (id: string) => {
    try {
      const response = await api.delete(`/api/products/${id}`)

      if (response.status === 200) {
        showToast("success", response.data.message)

        const removeProduct = productsData.filter(
          (product) => product._id !== id
        )
        setProductsData(removeProduct)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (product: ProductsDataTypes) => {
    setOpen(true)
    setProductsEditData(product)
  }

  return (
    <div className='flex flex-col items-center md:px-[5%] box-border py-3 md:py-[10px] my-5 mx-5 rounded-md bg-white'>
      <h1 className='text-2xl font-bold mb-4'>All Product List</h1>
      <div className='overflow-x-auto w-full'>
        {isLoading ? (
          <div className='flex justify-center items-center w-full'>
            <Loader />
          </div>
        ) : (
          <table className='table-auto w-full border-collapse'>
            <thead className='bg-gray-100'>
              <tr className='text-left text-xs md:text-sm text-[#454545] font-semibold'>
                <th className='px-4 py-2'>Products</th>
                <th className='px-4 py-2'>Title</th>
                <th className='px-4 py-2'>Old Price</th>
                <th className='px-4 py-2'>New Price</th>
                <th className='px-4 py-2'>Category</th>
                <th className='px-4 py-2 text-center'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {productsData.length === 0 ? (
                <tr>
                  <td>No product left</td>
                </tr>
              ) : (
                productsData.map((product: ProductsDataTypes, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } text-xs md:text-sm`}>
                    <td className='px-4 py-2'>
                      <img
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className='object-contain'
                      />
                    </td>
                    <td className='px-4 py-2'>{product.name}</td>
                    <td className='px-4 py-2'>{product.price}</td>
                    <td className='px-4 py-2'>
                      {Math.floor(product.discountPrice)}
                    </td>
                    <td className='px-4 py-2'>{product.category}</td>
                    <td className='px-4 flex items-center h-16 justify-center gap-x-5'>
                      <button
                        onClick={() => handleRemove(product._id)}
                        className='text-red-400 '>
                        <MdDelete className='text-2xl' />
                      </button>
                      <button className='' onClick={() => handleEdit(product)}>
                        <FiEdit className='text-xl text-green-500' />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <ProductEditModal
        open={open}
        setOpen={setOpen}
        product={productEditData}
      />
    </div>
  )
}

export default ManageProducts
