
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

export type CartPayload = {
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