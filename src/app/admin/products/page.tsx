"use client"
import AdminProductCard from "@/components/AdminProductCard"
import Loader from "@/components/Loader"
import ProductEditModal from "@/components/ProductEdit"
import VerificationModel from "@/components/VerificationModel"
import { DataContext } from "@/context/DataProvider"
import { useToast } from "@/context/ToastProvider"
import { ProductsDataTypes } from "@/types/dataTypes"
import api from "@/Utility/axiosInstance"
import React, { useContext, useState } from "react"

const ManageProducts = () => {
  const dataContext = useContext(DataContext)

  const { showToast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [verificationOpen, setVerificationOpen] = useState<boolean>(false)
  const [isAdminValidate, setIsAdminValidate] = useState<boolean>(false)
  const [productEditData, setProductsEditData] =
    useState<ProductsDataTypes | null>(null)

  if (!dataContext) {
    throw new Error(
      "ProductsContainer must be used within a DataContextProvider"
    )
  }

  const { products, loading, setProducts } = dataContext

  const handleRemove = async (id: string) => {
    if (!isAdminValidate) {
      return setVerificationOpen(true)
    }
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!isConfirmed) return
    try {
      const response = await api.delete(`/api/products/${id}`)

      if (response.status === 200) {
        showToast("success", response.data.message)

        const removeProduct = products?.filter((product) => product._id !== id)
        setProducts(removeProduct)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (product: ProductsDataTypes) => {
    if (!isAdminValidate) {
      return setVerificationOpen(true)
    }

    setOpen(true)
    setProductsEditData(product)
  }

  const updateProduct = (updatedProduct: ProductsDataTypes) => {
    const updatedProducts = products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    )

    setProducts(updatedProducts)
  }

  const handleClose = () => {
    setOpen(false)
    setProductsEditData(null)
  }

  const verificationClose = () => {
    setVerificationOpen(false)
  }

  return (
    <div className='flex flex-col items-center md:px-[5%] box-border py-3 md:py-[10px] my-5 mx-5 rounded-md bg-white'>
      <h1 className='text-2xl font-bold mb-4'>All Product List</h1>
      <div className='overflow-x-auto w-full'>
        {loading ? (
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
              {products.length === 0 ? (
                <tr>
                  <td>No product left</td>
                </tr>
              ) : (
                products.map((product: ProductsDataTypes, index: number) => (
                  <AdminProductCard
                    key={index}
                    product={product}
                    index={index}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                  />
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <ProductEditModal
        open={open}
        handleClose={handleClose}
        product={productEditData}
        updateProduct={updateProduct}
      />
      <VerificationModel
        open={verificationOpen}
        onClose={verificationClose}
        setIsAdminValidate={setIsAdminValidate}
      />
    </div>
  )
}

export default ManageProducts
