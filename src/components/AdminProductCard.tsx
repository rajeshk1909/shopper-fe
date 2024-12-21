import { ProductsDataTypes } from "@/types/dataTypes"
import Image from "next/image"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { MdDelete } from "react-icons/md"

interface AdminProductCardPropsTypes {
  product: ProductsDataTypes
  index: number
  handleRemove: (id: string) => void
  handleEdit: (product: ProductsDataTypes) => void
}

const AdminProductCard: React.FC<AdminProductCardPropsTypes> = ({
  product,
  index,
  handleRemove,
  handleEdit,
}) => {
  return (
    <tr
      className={`${
        index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
      } text-xs md:text-sm`}>
      <td className='px-4 py-2'>
        <Image
          src={product.image}
          alt={product.name}
          width={40}
          height={40}
          loading='lazy'
        />
      </td>
      <td className='px-4 py-2'>{product.name}</td>
      <td className='px-4 py-2'>{product.price}</td>
      <td className='px-4 py-2'>{Math.floor(product.discountPrice)}</td>
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
  )
}

export default AdminProductCard
