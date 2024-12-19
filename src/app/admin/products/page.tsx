"use client"
import api from "@/Utility/axiosInstance"
import React, { useEffect, useState } from "react"

const ManageProducts = () => {
  const [productsData, setProductsData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/products")

        if (response.status === 200) {
          setProductsData(response.data.products)
        } else {
          console.log("Failed to fetch data")
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchOneProducts = async (id: string) => {
      try {
        const response = await api.get(`/api/products/${id}`)
        if (response.status === 200) {
          // setProductsData(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchOneProducts("6762ff98d128cda89d834e39")
  }, [])

  console.log(productsData)

  return <div>ManageProducts</div>
}

export default ManageProducts
