import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'
import removeCartReducer from './removeCartReducer'
import addToCartReducer from './addToCartReducer'
import orderReducer from './orderReducer'
import ordersReducer from './ordersReducer'

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  removeFromCart: removeCartReducer,
  addToCart: addToCartReducer,
  order: orderReducer,
  orders: ordersReducer,
})
