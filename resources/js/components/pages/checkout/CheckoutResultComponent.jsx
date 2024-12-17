import React, { useState, useEffect } from "react"
import { useNavigate, } from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { getOrder, } from "../../../redux/actions/orderActions"
import Message from "./MessageComponent"

export default function CheckoutResultComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderState = useSelector(state => state.order)
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("orderId")) {
      dispatch(getOrder(query.get("orderId")))
    } else {
      return navigate("/404")
    }

    if (query.get("success")) {
      setMessage("Order placed!")
      setTitle("Order Placed")
    }

    if (query.get("cancelled")) {
      setMessage(
        "Order cancelled -- continue to shop around and checkout when you're ready."
      )
      setTitle("Order Cancelled")
    }
  }, []);

  useEffect(() => {
    if (false === orderState.loading && null !== orderState.error) {
      return navigate("/404")
    }
  }, [orderState,])

  const renderPreferredSchedules = () => {
    const preferredSchedules = orderState.data.data.preferredSchedules
    if (0 === preferredSchedules.length) {
      return null
    }

    return <p>{preferredSchedules.map((schedule, index) => (
      <div key={index}>
        <span>Preferred date and time: {schedule.dateTime}</span>
        <br/>
      </div>
    ))}</p>
  }

  if (orderState.loading) {
    return <div className='container login-container text-center'>
      <Helmet>
        <title>Checkout Order - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="container checkout-container">
      <Helmet>
        <title>{title} - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <Message message={message} />
      <section className="col-md-10 offset-md-1 text-center">
        <h4>
          Order {orderState.data.data.id} for {orderState.data.data.orderProducts[0].name} at {orderState.data.data.formattedPrice}
        </h4>
        {renderPreferredSchedules()}
      </section>
    </div>
  )
}
