"use client"

import { setCart } from "@/store/features/cartSlice"
import { RootState } from "@/store/store"
import { CartDataTypes, ProductsDataTypes } from "@/types/dataTypes"
import api from "@/Utility/axiosInstance"
import React, { createContext, useEffect, useState, ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"

interface DataContextTypes {
  products: ProductsDataTypes[]
  setProducts: React.Dispatch<React.SetStateAction<ProductsDataTypes[]>>
  loading: boolean
  wishlistItems: ProductsDataTypes[]
  cartItems: CartDataTypes[]
  setWishlistItems: React.Dispatch<React.SetStateAction<ProductsDataTypes[]>>
  setCartItems: React.Dispatch<React.SetStateAction<CartDataTypes[]>>
  addToCart: (id: string) => void
  removeToCart: (id: string) => void
  updateCart: (id: string, updateCart: number) => void
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
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.user.user)
  const wishlistData = useSelector(
    (state: RootState) => state.wishlist.wishlist
  )

  const cartData = useSelector((state: RootState) => state.cart.cart)
  const [products, setProducts] = useState<ProductsDataTypes[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [wishlistItems, setWishlistItems] = useState<ProductsDataTypes[]>([])

  const [cartItems, setCartItems] = useState<CartDataTypes[]>([])

  useEffect(() => {
    if (cartData) {
      const updatedCart = products.filter((product) =>
        cartData.some((cartItem) => cartItem.product === product._id)
      )

      const mergedCart = updatedCart.map((product) => {
        const matchingItem = cartData.find(
          (item) => item.product === product._id
        )
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

  const addToCart = async (id: string) => {
    if (!user?._id) {
      return console.log("user not found")
    } else if (!id) {
      return console.log("product not found")
    }
    const existingProduct = cartData?.find((item) => item.product === id)
    if (existingProduct) {
      return
    }

    const newCartData = {
      productId: id,
      quantity: 1,
      userId: user?._id,
    }

    try {
      const response = await api.post("/api/user/cart", newCartData)

      if (response.status === 200) {
        dispatch(setCart(response.data.cart))
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeToCart = async (id: string) => {
    if (!user?._id) {
      return console.log("user not found")
    } else if (!id) {
      return console.log("product not found")
    }

    const product = {
      productId: id,
      userId: user?._id,
    }

    try {
      const response = await api.delete("/api/user/cart", {
        data: product,
      })

      if (response.status === 200) {
        dispatch(setCart(response.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateCart = async (id: string, newQuantity: number) => {
    if (!user?._id) {
      return console.log("User not found")
    } else if (!id) {
      return console.log("Product not found")
    }

    // Check if the product exists in the cart
    const existingProduct = cartData?.find((item) => item.product === id)
    if (!existingProduct) {
      return console.log("Product not found in cart")
    }

    if (newQuantity < 1 || newQuantity > 10) {
      return console.log("Invalid quantity. Quantity must be between 1 and 10.")
    }

    const newCartData = {
      productId: id,
      quantity: newQuantity,
      userId: user?._id,
    }

    try {
      const response = await api.put("/api/user/cart", newCartData)

      if (response.status === 200) {
        dispatch(setCart(response.data.cart))
      } else {
        console.log("Failed to update cart")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        updateCart,
        removeToCart,
        loading,
        wishlistItems,
        setWishlistItems,
        cartItems,
        setCartItems,
        addToCart,
      }}>
      {children}
    </DataContext.Provider>
  )
}
