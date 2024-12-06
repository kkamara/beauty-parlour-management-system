import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'
import removeCartReducer from './removeCartReducer'
import addToCartReducer from './addToCartReducer'

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  removeFromCart: removeCartReducer,
  addToCart: addToCartReducer,
})
