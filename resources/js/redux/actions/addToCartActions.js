
import HttpService from '../../services/HttpService'
import { addToCart, } from '../types'

export const addItemToCart = productId => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: addToCart.ADD_TO_CART_PENDING, })

    const tokenId = "user-token"
    const path = "/cart/product/"+productId
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.patchData(path, null, tokenId).then(res => {
          resolve(dispatch({
            type: addToCart.ADD_TO_CART_SUCCESS,
            payload: res.data,
          }))                
        }, error => {
          reject(dispatch({ 
            type : addToCart.ADD_TO_CART_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : addToCart.ADD_TO_CART_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
