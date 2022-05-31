// import { initialState } from './ProductsInCartContext'

import { Product } from "./product/ProductContext"



type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}
//Cart

export enum Types {
  AddToCart = 'ADD_TO_CART',
  DeleteFromCart = 'REMOVE_FROM_CART',
  UpdateQty = 'CHANGE_PROD_QTY',
  ResetCart = 'RESET_CART',
}

export type CartType = {
  _id: string
  title: string
  description: string
  price: number
  qty: number
  imgURL: string
}

type CartPayload = {
  [Types.AddToCart]: {
    _id: string
    title: string
    description: string
    price: number
    qty: number
    imgURL: string
  }

  [Types.DeleteFromCart]: {
    _id: string
  }
  [Types.UpdateQty]: {
    _id: string
    qty: number
  }
  [Types.ResetCart]: {}
}

export const initialState = [] as CartType[]
export type State = typeof initialState

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>]

export const cartReducer = (state: State, action: CartActions) => {
  switch (action.type) {
    case Types.AddToCart:
      return [...state, { ...action.payload, qty: 1 }]
    case Types.DeleteFromCart:
      return state.filter((c: { _id: string }) => c._id !== action.payload._id)
    case Types.UpdateQty:
      return [
        ...state.filter((cartItem: CartType) => {
          return cartItem._id === action.payload._id
            ? (cartItem.qty = action.payload.qty)
            : cartItem.qty
        }),
      ]
    case Types.ResetCart:
      return (state = initialState)
    default:
      throw new Error('error')
  }
}

// Products

export enum ProductTypes {
  Create = 'CREATE_PRODUCT',
  Read = 'READ_PRODUCT',
  Update = 'UPDATE_PRODUCT',
  Delete = 'DELETE_PRODUCT',
}

type ProductPayload = {
  [ProductTypes.Create]: {
    product: Product
  }
  [ProductTypes.Read]: {
    _id: string
  }
  [ProductTypes.Update]: {
    product: Product
  }
  [ProductTypes.Delete]: {
    _id: string
  }
}

const initialStateProd = [] as Product[]
export type Data = typeof initialStateProd

export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>]

export const productReducer = (state: Data, action: ProductActions) => {
  switch (action.type) {
    case ProductTypes.Create:
      const productsAfterCreate = [...state]
      productsAfterCreate.push(action.payload.product)
      return productsAfterCreate
    case ProductTypes.Read:
      return state
    case ProductTypes.Update:
      const products = [...state]
      let productIndex = products.findIndex(
        (product) => product._id === action.payload.product._id
      )
      if (productIndex !== -1) {
        products[productIndex] = action.payload.product
      }

      return products
    case ProductTypes.Delete:
      const productsAfterDeletion = state.filter(
        (product) => product._id !== action.payload._id
      )

      return productsAfterDeletion

    default:
      throw new Error('error')
  }
}

export interface ProductEditState extends Product {
  nameValid: boolean
  informationValid: boolean
  categoryValid: boolean
  priceValid: boolean
  imgURLValid: boolean
}

export enum ProductEditReducerType {
  Update,
  Reset,
}

type ProductEditPayload = {
  [ProductEditReducerType.Update]: {
    key: string
    value: any
  }
  [ProductEditReducerType.Reset]: {
    product: Product
  }
}

export type ProductEditAction =
  ActionMap<ProductEditPayload>[keyof ActionMap<ProductEditPayload>]

export function ProductEditReducer(
  state: ProductEditState,
  action: ProductEditAction
) {
  switch (action.type) {
    case ProductEditReducerType.Update:
      const key = action.payload.key
      const value = action.payload.value
      return {
        ...state,
        [key]: action.payload.value,
        [key + 'Valid']:
          value !== '' && (typeof value !== typeof 0 || !isNaN(value)),
      }
    case ProductEditReducerType.Reset:
      return { ...state, ...action.payload.product }
    default:
      throw new Error('error')
  }
}
