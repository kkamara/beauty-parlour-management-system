import React from 'react'
import { Routes, Route, } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Home from "./components/pages/HomeComponent"
import HairStyling from "./components/pages/service/HairStylingComponent"
import HairColouring from "./components/pages/service/HairColouringComponent"
import HairTreatment from "./components/pages/service/HairTreatmentComponent"
import Cart from "./components/pages/cart/CartComponent"
import Orders from "./components/pages/orders/OrdersComponent"

import CheckoutResult from "./components/pages/checkout/CheckoutResultComponent"

import Login from "./components/pages/auth/LoginComponent"
import Logout from "./components/pages/auth/LogoutComponent"
import Register from "./components/pages/auth/RegisterComponent"
import NotFound from "./components/pages/http/NotFoundComponent"

import { url, } from './utils/config'

export default () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={url("/")} element={<Home />}/>
        <Route path={url("/cart")} element={<Cart />}/>
        <Route path={url("/orders")} element={<Orders />}/>
        <Route path={url("/checkout/result")} element={<CheckoutResult />}/>
        <Route path={url("/services/hair-styling")} element={<HairStyling />}/>
        <Route path={url("/services/hair-colouring")} element={<HairColouring />}/>
        <Route path={url("/services/hair-treatment")} element={<HairTreatment />}/>
        <Route path={url("/user/login")} element={<Login />}/>
        <Route path={url("/user/logout")} element={<Logout />}/>
        <Route path={url("/user/register")} element={<Register />}/>
        <Route path={url("*")} element={<NotFound />}/>
      </Routes>
      <Footer/>
    </>
  )
}
