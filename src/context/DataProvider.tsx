"use client"

import { RootState } from "@/store/store"
import { ProductsDataTypes } from "@/types/dataTypes"
import api from "@/Utility/axiosInstance"
import React, { createContext, useEffect, useState, ReactNode } from "react"
import { useSelector } from "react-redux"

interface DataContextTypes {
  products: ProductsDataTypes[]
  setProducts: React.Dispatch<React.SetStateAction<ProductsDataTypes[]>>
  loading: boolean
  wishlistItems: ProductsDataTypes[]
  cartItems: ProductsDataTypes[]
  setWishlistItems: React.Dispatch<React.SetStateAction<ProductsDataTypes[]>>
  setCartItems: React.Dispatch<React.SetStateAction<ProductsDataTypes[]>>
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
  const wishlistData = useSelector(
    (state: RootState) => state.user.user?.wishlist
  )
  const cartData = useSelector((state: RootState) => state.user.user?.cart)
  const [products, setProducts] = useState<ProductsDataTypes[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [wishlistItems, setWishlistItems] = useState<ProductsDataTypes[]>([])

  const [cartItems, setCartItems] = useState<ProductsDataTypes[]>([])

  useEffect(() => {
    if (cartData) {
      const updatedCart = products.filter((product) =>
        cartData.some((cartItem) => cartItem.product === product._id)
      )

      const mergedCart = updatedCart.map((product) => {
        const matchingItem = cartData.find((item) => item._id === product._id)
        return {
          ...product,
          quantity: matchingItem?.quantity || 1,
        }
      })

      setCartItems(mergedCart)
    }
  }, [cartData, products])

  useEffect(() => {
    if (wishlistData && products) {
      const filteredItems = products.filter((product) =>
        wishlistData.includes(product._id)
      )
      setWishlistItems(filteredItems)
    }
  }, [products, wishlistData])

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
    <DataContext.Provider
      value={{
        products,
        setProducts,
        loading,
        wishlistItems,
        setWishlistItems,
        cartItems,
        setCartItems,
      }}>
      {children}
    </DataContext.Provider>
  )
}
