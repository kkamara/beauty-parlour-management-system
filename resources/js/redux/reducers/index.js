import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'
import removeCartReducer from './removeCartReducer'

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  removeFromCart: removeCartReducer,
})
