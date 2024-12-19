import * as React from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import { ProductsDataTypes } from "@/app/admin/products/page"
import { Input } from "./Input"

interface ProductEditModalPropsTypes {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductsDataTypes | null
}

interface formdata {
  name: string
  price: string
  discountPercentage: string
  starRating: string
}

const ProductEditModal: React.FC<ProductEditModalPropsTypes> = ({
  open,
  setOpen,
  product,
}) => {
  const [formdata, setFormData] = React.useState<formdata>({
    name: "",
    price: "",
    discountPercentage: "",
    starRating: "",
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {}

  return (
    <div>
      <Modal
        open={open}
        onClose={setOpen}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <div className='flex items-center justify-center w-full h-screen '>
          <div className='space-y-4 w-[600px] bg-white py-10 px-10 rounded-md shadow-lg'>
            <h1 className='text-center pb-5 text-red-500'>
              Edit your products
            </h1>
            <form onSubmit={handleSubmit}>
              <Input
                label='Product Title'
                name='name'
                type='text'
                value={product?.name}
                handleChange={changeHandler}
              />
              <Input
                label='Price'
                name='price'
                type='number'
                value={product?.price.toString()}
                handleChange={changeHandler}
              />
              <Input
                label='Discount Percentage'
                name='discountPercentage'
                type='number'
                value={product?.discountPercentage.toString()}
                handleChange={changeHandler}
              />
              <Input
                label='Star Rating'
                name='starRating'
                type='number'
                value={product?.starRating.toString()}
                handleChange={changeHandler}
              />
              <div className='flex items-center pt-5 justify-center gap-10'>
                <Button>Cancel </Button>
                <Button>Save </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProductEditModal
