import { removeFromCart, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function removeCartReducer (state = initState, action) {
  switch (action.type) {
    
    case removeFromCart.REMOVE_FROM_CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case removeFromCart.REMOVE_FROM_CART_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case removeFromCart.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
