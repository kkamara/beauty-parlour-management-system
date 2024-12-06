import React, { useEffect, useState, } from 'react'
import { useNavigate, } from "react-router"
import { Helmet, } from "react-helmet"
import { useSelector, useDispatch, } from 'react-redux'
import RemoveFromCartModal from "./RemoveFromCartModal"
import { removeServiceFromCart, } from "../../../redux/actions/removeCartActions"
import { getCart, } from "../../../redux/actions/cartActions"

import "./CartComponent.scss"

export default function CartComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    cart: state.cart,
    removeFromCart: state.removeFromCart,
  }))
  const [countPreferredDateTime, setCountPreferredDateTime] = useState(0)

  useEffect(() => {
    if (
      false === state.auth.loading &&
      typeof state.auth.data === "object" &&
      null === state.auth.data
    ) {
      navigate("/user/login")
    }
  }, [state.auth])

  useEffect(() => {
    if (
      false === state.removeFromCart.loading &&
      typeof state.removeFromCart.data === "object" &&
      null !== state.removeFromCart.data
    ) {
      dispatch(getCart())
    }
  }, [state.removeFromCart])
  
  const renderPreferredDateTime = () => {
    let result
    switch(countPreferredDateTime) {
      case 0:
      break;
      case 1:
        result = <div className="preferred-form">
          <div className="form-group">
            <label htmlFor="preferredDate[0]">Preferred date:</label>
            <input type="date" name="preferredDate[0]" className="form-control" id="preferredDate[0]" />
          </div>
          <div className="form-group">
            <label htmlFor="preferredTime[0]">Preferred time:</label>
            <input type="time" name="preferredTime[0]" className="form-control" id="preferredTime[0]" />
          </div>
        </div>
      break;
      case 2:
        result = <>
          <div className="preferred-form">
            <div className="form-group">
              <label htmlFor="preferredDate[0]">Preferred date:</label>
              <input type="date" name="preferredDate[0]" className="form-control" id="preferredDate[0]" />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime[0]">Preferred time:</label>
              <input type="time" name="preferredTime[0]" className="form-control" id="preferredTime[0]" />
            </div>
          </div>
          <div className="preferred-form">
            <div className="form-group">
              <label htmlFor="preferredDate[0]">Preferred date:</label>
              <input type="date" name="preferredDate[1]" className="form-control" id="preferredDate[1]" />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime[0]">Preferred time:</label>
              <input type="time" name="preferredTime[1]" className="form-control" id="preferredTime[1]" />
            </div>
          </div>
        </>
      break;
      case 3:
      default:
        result = <>
          <div className="preferred-form">
            <div className="form-group">
              <label htmlFor="preferredDate[0]">Preferred date:</label>
              <input type="date" name="preferredDate[0]" className="form-control" id="preferredDate[0]" />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime[0]">Preferred time:</label>
              <input type="time" name="preferredTime[0]" className="form-control" id="preferredTime[0]" />
            </div>
          </div>
          <div className="preferred-form">
            <div className="form-group">
              <label htmlFor="preferredDate[1]">Preferred date:</label>
              <input type="date" name="preferredDate[1]" className="form-control" id="preferredDate[1]" />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime[1]">Preferred time:</label>
              <input type="time" name="preferredTime[1]" className="form-control" id="preferredTime[1]" />
            </div>
          </div>
          <div className="preferred-form">
            <div className="form-group">
              <label htmlFor="preferredDate[2]">Preferred date:</label>
              <input type="date" name="preferredDate[2]" className="form-control" id="preferredDate[2]" />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime[2]">Preferred time:</label>
              <input type="time" name="preferredTime[2]" className="form-control" id="preferredTime[2]" />
            </div>
          </div>
        </>
      break;
    }
    return result 
  }

  const addPreferredDateTime = () => {
    setCountPreferredDateTime(state => state + 1)
  }
  
  const removeFromCart = () => {
    dispatch(removeServiceFromCart(state.cart.data.data[0].id))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const preferredDate1 = document.getElementById("preferredDate[0]")
    const preferredTime1 = document.getElementById("preferredTime[0]")
    console.log(preferredDate1, preferredDate1.value)
    console.log(preferredTime1, preferredTime1.value)
  }

  const renderCartItems = () => {
    if (
      false === state.cart.loading &&
      typeof state.cart.data === "object" &&
      null !== state.cart.data &&
      0 === state.cart.data.data.length
    ) {
      return <div className="text-center">
        Your cart is empty.
      </div>
    }

    return state.cart.data.data.map((cartItem, key) => (
      <div className="card" key={key}>
        <div className="card-body">
          <div className="float-start cart-area-1">
            <h3>{cartItem.product.name}</h3>
            <p>{cartItem.product.description}</p>
            {renderPreferredDateTime()}
            <div className="text-end">
              {countPreferredDateTime < 3 && <button
                className="btn btn-info"
                onClick={addPreferredDateTime}
              >
                Add Preferred Date & Time
              </button>}
              <RemoveFromCartModal
                removeFromCart={removeFromCart}
                name={cartItem.product.name}
                price={cartItem.formattedPrice}
              />
            </div>
          </div>
          <div className="float-end cart-area-2">
            <p className="cart-cost">
              {cartItem.formattedPrice}
            </p>
          </div>
        </div>
      </div>
    ))
  }

  const renderCheckoutBtn = () => {
    if (
      false === state.cart.loading &&
      typeof state.cart.data === "object" &&
      null !== state.cart.data &&
      0 < state.cart.data.data.length
    ) {
      return <input
        className="btn btn-success"
        type="submit"
        value="Checkout"
      />
    }

    return null
  }

  if (state.auth.loading || state.cart.loading) {
    return <div className="text-center">
      Loading...
    </div>
  }

  return (
    <div className='container cart-container'>
      <Helmet>
        <title>Cart - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h1>Cart</h1>

          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-8">
              {renderCartItems()}
            </div>

            <div className="col-md-4 text-end">
              {renderCheckoutBtn()}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
