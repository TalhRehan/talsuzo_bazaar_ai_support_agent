export interface productType {


  sold: number
  images: string[]
  subcategory: unknown[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: categoryType
  brand: brandType 
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  availableColors?: string[]
  priceAfterDiscount?: number;
}

export interface categoryType {_id: string
  name: string
  slug: string
  image: string
  createdAt:string
  updatedAt:string
}
export interface brandType {_id: string
  name: string
  slug: string
  image: string
}
