export interface ProductsDataTypes {
  _id: string
  image: string
  name: string
  category: string
  discountPrice: number
  discountPercentage: number
  price: number
  starRating: number
  quantity:number
}

export interface CartTypes {
  product: string
  quantity: number
  _id : string
}

export interface UserDataTypes {
  _id: string
  name: string
  role: string
  wishlist: Array<string>
  cart:Array<CartTypes>
}

export interface AdminData {
  _id: string,
  name: string
  role : string
}