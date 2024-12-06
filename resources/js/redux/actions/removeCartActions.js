
import HttpService from '../../services/HttpService'
import { removeFromCart, } from '../types'

export const removeServiceFromCart = cartId => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: removeCart.REMOVE_FROM_CART_PENDING, })

    const tokenId = "user-token"
    const path = "/cart/"+cartId
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.delData(path, tokenId).then(res => {
          resolve(dispatch({
            type: removeCart.REMOVE_FROM_CART_SUCCESS,
            payload: res.data,
          }))                
        }, error => {
          reject(dispatch({ 
            type : removeCart.REMOVE_FROM_CART_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : removeCart.REMOVE_FROM_CART_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
