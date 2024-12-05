import React, { useEffect, useState, } from 'react'
import { useDispatch, } from "react-redux"
import { useSelector, } from 'react-redux'
import { Link, } from 'react-router-dom'
import { authorize, } from "../../redux/actions/authActions"
import { getCart, } from "../../redux/actions/cartActions"

import "./Header.scss"

export default function Header(props) {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    cart: state.cart,
  }))
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (
      false === state.auth.loading &&
      typeof state.auth.data === "object" &&
      null !== state.auth.data
    ) {
      dispatch(getCart())
    }
  }, [state.auth])

  useEffect(() => {
    if (
      false === state.cart.loading &&
      typeof state.cart.data === "object" &&
      null !== state.cart.data
    ) {
      createCartQuantity()
    }
  }, [state.cart])

  const createCartQuantity = () => {
    const quantity = state.cart.data.data.reduce((acc, curr) => {
      return acc + curr.quantity
    }, 0)
    setQuantity(quantity)
  }
  
  const renderNavLinks = () => {
    if(state.auth.data) {
      return <>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link
                className="dropdown-item" 
                to="/user/logout"
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active" 
            aria-current="page" 
            to="/cart"
          >
            Cart ({quantity})
          </Link>
        </li>
      </>
    } else {
      return <>
        <li className="nav-item">
          <Link
            className="nav-link active" 
            aria-current="page" 
            to="/user/login"
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active" 
            aria-current="page" 
            to="/user/register"
          >
            Register
          </Link>
        </li>
      </>
    }
  }
  // VITE_TEST
  console.log(import.meta.env)
  return <nav className="navbar navbar-expand-lg mb-4 bg-primary" data-bs-theme="dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        {import.meta.env.VITE_APP_NAME}
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          {renderNavLinks()}
        </ul>
      </div>
    </div>
  </nav>
}
