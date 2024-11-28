import React, { useEffect, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { Helmet, } from "react-helmet"
import { getUsers, } from '../../../redux/actions/usersActions'

import ServiceComponent from "./ServiceComponent"

export default function HairStylingComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {}, [])

  const addToCart = () => {
    if (
      !state.auth.loading &&
      typeof state.auth.data === 'object' &&
      null !== state.auth.data
    ) {
      // TODO: Add To Cart
      alert("Adding to cart...")
    } else if (
      !state.auth.loading &&
      typeof state.auth.data === 'object' &&
      null === state.auth.data
    ) {
      alert("You must sign in or register to complete this action.")
    }
  }

  return (
    <>
      <div className='container hair-styling-container'>
        <Helmet>
          <title>Hair Styling - Services - {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <div className="row">
          <ServiceComponent
            title={"Hair Styling Service"}
            addToCart={addToCart}
            Text={() => <>
                Ad veniam nisi occaecat aute ad irure qui consectetur sunt non velit enim ullamco. Eiusmod nisi ex magna velit velit labore officia occaecat. Nostrud dolor consectetur consequat ex. Lorem reprehenderit est nisi ad quis. Proident laborum nulla commodo aute. Dolore ea laboris voluptate nostrud dolor sit anim nostrud ullamco veniam mollit.
                <br/>
                Fugiat Lorem do anim esse culpa ad incididunt non fugiat aute do enim. Ea occaecat nisi laboris culpa dolore eu tempor id voluptate. Aliqua duis officia non adipisicing do deserunt anim reprehenderit nisi. Lorem mollit aliqua id nisi ipsum quis deserunt exercitation labore. Aliquip amet qui esse pariatur et ipsum veniam est. Tempor pariatur in et nisi.
                <br/>
                Do non eu pariatur dolore magna. Ullamco anim reprehenderit anim veniam non esse anim labore. Magna est elit do quis aute et amet ad elit in sint ut. Do est laboris deserunt elit enim id deserunt.
            </>}
            operationBtnText={"Add To Cart"}
            operationBtnClasses={"btn-success"}
          />
        </div>
      </div>
    </>
  )
}
