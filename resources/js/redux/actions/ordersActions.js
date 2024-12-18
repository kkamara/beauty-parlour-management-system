
import HttpService from '../../services/HttpService'
import { orders, } from '../types'

export const getOrders = (page, query) => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: orders.GET_ORDERS_PENDING, })

    const tokenId = "user-token"
    let path = "/orders"
    const params = new URLSearchParams()
    if (page) {
      params.append("page", page)
    }
    if (query) {
      params.append("query", query)
    }
    path += "?"+params.toString()
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.getData(path, tokenId).then(res => {
          resolve(dispatch({
            type: orders.GET_ORDERS_SUCCESS,
            payload: res.data,
          }))                
        }, error => {
          reject(dispatch({ 
            type : orders.GET_ORDERS_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : orders.GET_ORDERS_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
