import React, { useEffect, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams, } from "react-router"
import { Helmet, } from "react-helmet"
import { getOrder, } from '../../../redux/actions/orderActions'

export default function OrderComponent() {
  const params = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    order: state.order,
  }))

  useEffect(() => {
    dispatch(getOrder(params.id))
  }, [])
  
  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
  }, [state.auth,])

  const renderPreferredSchedules = (preferredSchedules) => {
    if (0 === preferredSchedules.length) {
      return null
    }

    return <p>{preferredSchedules.map((schedule, index) => (
      <p key={index}>
        <span><span className="fw-bolder">Preferred date and time:</span> {schedule.dateTime}</span>
        <br/>
      </p>
    ))}</p>
  }

  const renderOrder = () => {
    if (!state.order.data) {
      return null
    }
    return (
      <>
        <div className="card orders-card">
          <div className="card header">
            <h4>
              Order <span className="orderId">{state.order.data.data.id}</span> for {state.order.data.data.orderProducts[0].name}&nbsp;
              at <span className="price">{state.order.data.data.formattedPrice}</span>
            </h4>
          </div>
          <div className="card-body">
            <p><span className="fw-bolder">Status:</span> {state.order.data.data.status}</p>
            {renderPreferredSchedules(state.order.data.data.preferredSchedules)}
            <p>
              <span className="fw-bolder">Assigned date and time:</span>&nbsp;
              <span className="text-decoration-underline">{state.order.data.data.dateTime || "No date and time assigned yet."}</span>
            </p>
            <p>
              <span className="fw-bolder">Assigned worker:</span>&nbsp;
              <span className="text-decoration-underline">{state.order.data.data.workerAssigned || "No worker assigned yet."}</span>
            </p>
          </div>
        </div>
      </>
    )
  }

  if (
    !state.auth.loading &&
    typeof state.auth.data === 'object' &&
    null !== state.auth.data
  ) {
    console.log('authenticated', state.auth.data)
  }
  if (
    !state.order.loading &&
    typeof state.order.data === 'object' &&
    null !== state.order.data
  ) {
    console.log('order', state.order.data)
  }
  if (state.auth.loading || state.order.loading) {
    return <div className="container order-container text-center">
      <Helmet>
        <title>My Order - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }
  
  return (
    <div className='container order-container'>
      <Helmet>
        <title>My Order - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>My Order</h3>
          {renderOrder()}
        </div>
      </div>
    </div>
  )
}
