import React, { useEffect, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"

import ServiceComponent from "./ServiceComponent"

export default function HairColouringComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {}, [])

  const addToCart = () => {
    if (
      !state.auth.loading &&
      typeof state.auth.data === 'object' &&
      null === state.auth.data
    ) {
      return alert("You must sign in or register to complete this action.")
    }
    if (
      !state.auth.loading &&
      typeof state.auth.data === 'object' &&
      null !== state.auth.data
    ) {
      // TODO: Add To Cart
      return alert("Adding to cart...")
    }
  }

  return (
    <>
      <div className='container hair-styling-container'>
        <Helmet>
          <title>Hair Colouring - Services - {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <div className="row">
          <ServiceComponent
            title={"Hair Colouring Service"}
            addToCart={addToCart}
            Text={() => <>
              Veniam mollit nostrud non nulla irure nisi consectetur sunt officia cupidatat pariatur id aliqua. Ullamco aute sint labore qui veniam. Culpa fugiat ut consequat quis ad minim minim est velit. Ipsum officia ipsum Lorem ullamco consectetur esse dolore elit qui est minim non. Tempor ea dolore id dolore.
              <br/>
              Laboris do laborum sit laborum mollit non. In enim ex do esse reprehenderit. Eiusmod reprehenderit aliqua consequat ipsum.
              <br/>
              In magna eu anim mollit qui sunt consequat fugiat voluptate laborum adipisicing. Culpa enim excepteur id ullamco occaecat eiusmod deserunt. Non occaecat dolore reprehenderit ad est ad ut exercitation dolore esse ut. Tempor proident veniam laboris veniam enim tempor reprehenderit in velit fugiat. Sunt dolor aliquip laboris esse laboris nostrud incididunt eu veniam et dolore.
            </>}
            operationBtnText={"Add To Cart"}
            operationBtnClasses={"btn-success"}
            price={"£50.00"}
          />
        </div>
      </div>
    </>
  )
}
