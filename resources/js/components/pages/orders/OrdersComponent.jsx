import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { Helmet, } from "react-helmet"
import { getOrders, } from '../../../redux/actions/ordersActions'

import "./OrdersComponent.scss"

export default function OrdersComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    orders: state.orders,
  }))
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(null)

  useEffect(() => {
    dispatch(getOrders())
  }, [])
  
  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
  }, [state.auth,])

  const handlePageChange = ({ selected, }) => {
    const newPage = selected + 1
    if (newPage > state.orders.data.meta.lastPage) {
      return
    }
    dispatch(getOrders(newPage))
    setPage(newPage)
  }

  const pagination = () => {
    if (!state.orders.data) {
        return null
    }

    return <ReactPaginate
      onPageChange={handlePageChange}
      previousLabel="Previous"
      nextLabel="Next"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={state.orders.data.meta.lastPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName="pagination"
      activeClassName="active"
      forcePage={state.orders.data.meta.currentPage - 1}
    />
  }

  const paginationDetail = () => {
    return <div className="text-center">
      <strong>Page</strong> ({state.orders.data.meta.currentPage}),&nbsp;
      <strong>Page Count</strong> ({state.orders.data.meta.lastPage}),&nbsp;
      <strong>Displayed Items</strong> ({state.orders.data.data.length}),&nbsp;
      <strong>Items</strong> ({state.orders.data.meta.total})
    </div>
  }

  const parseDate = date => moment(date).format('YYYY-MM-DD hh:mm')

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    if (query) {
      dispatch(getOrders(page, query))
    } else {
      dispatch(getOrders(page))
    }
  }

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

  const renderList = () => {
    if (!state.orders.data) {
      return null
    }
    return (
      <>
        {paginationDetail()}
        <ul className="list-group">
          {state.orders.data.data.map((order, index) => (
            <div key={index} className="card orders-card">
              <div className="card header">
                <h4>
                  Order <span className="orderId">{order.id}</span> for {order.orderProducts[0].name}&nbsp;
                  at <span className="price">{order.formattedPrice}</span>
                </h4>
              </div>
              <div className="card-body">
                <p><span className="fw-bolder">Status:</span> {order.status}</p>
                {renderPreferredSchedules(order.preferredSchedules)}
                <p>
                  <span className="fw-bolder">Assigned date and time:</span>&nbsp;
                  <span className="text-decoration-underline">{order.dateTime || "No date and time assigned yet."}</span>
                </p>
                <p>
                  <span className="fw-bolder">Assigned worker:</span>&nbsp;
                  <span className="text-decoration-underline">{order.workerAssigned || "No worker assigned yet."}</span>
                </p>
              </div>
              <div className="card-footer">
                <div className="text-end">
                  <a href={`/orders/${order.id}`} className="btn btn-info">
                    View Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </ul>
        {paginationDetail()}
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
    !state.orders.loading &&
    typeof state.orders.data === 'object' &&
    null !== state.orders.data
  ) {
    console.log('orders', state.orders.data)
  }
  if (state.auth.loading || state.orders.loading) {
    return <div className="container orders-container text-center">
      <Helmet>
        <title>My Orders - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return (
    <div className='container orders-container'>
      <Helmet>
        <title>My Orders - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <form onSubmit={handleFormSubmit} className="row float-end">
        <div className="form-group col-6">
          <label htmlFor="query">Search all orders:</label>
          <input
            className="form-control"
            type="text"
            name="query"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        <div className="form-group col-6">
          <input
            type="submit"
            className="btn btn-success"
            value="Search"
          />
        </div>
      </form>
      <br />
      <br />
      {pagination()}
      {renderList()}
      {pagination()}
    </div>
  )
}
