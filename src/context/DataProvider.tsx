"use client"

import { ProductsDataTypes } from "@/types/dataTypes"
import api from "@/Utility/axiosInstance"
import React, { createContext, useEffect, useState, ReactNode } from "react"

interface DataContextTypes {
  products: ProductsDataTypes[]
  setProducts: React.Dispatch<React.SetStateAction<ProductsDataTypes[]>>
  loading: boolean
}

export const DataContext = createContext<DataContextTypes | undefined>(
  undefined
)

interface DataContextProviderPropsTypes {
  children: ReactNode
}

export const DataContextProvider: React.FC<DataContextProviderPropsTypes> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductsDataTypes[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true)
      try {
        const response = await api.get("/api/products")

        if (response.status === 200) {
          setProducts(response.data.products)
        } else {
          console.warn("Failed to fetch data :", response.data.message)
        }
      } catch (error) {
        console.error("Error fetching product data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [])

  return (
    <DataContext.Provider value={{ products, setProducts, loading }}>
      {children}
    </DataContext.Provider>
  )
}
