import React from 'react'
import { Helmet, } from "react-helmet"

import "./CartComponent.scss"

export default function CartComponent() {
  return (
    <>
      <div className='container cart-container'>
        <Helmet>
          <title>Cart - {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1>Cart</h1>

          </div>
        </div>
      </div>
    </>
  )
}
