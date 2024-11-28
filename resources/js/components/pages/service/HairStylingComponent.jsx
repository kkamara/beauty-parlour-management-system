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
    users: state.users,
  }))

  useEffect(() => {}, [])

  return (
    <>
      <div className='container hair-styling-container'>
        <Helmet>
          <title>Hair Styling - Services - {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <div className="row">
          <div className="col-md-10 offset-md-1">
              <ServiceComponent title={"Hair Styling Service"} />
          </div>
        </div>
      </div>
    </>
  )
}
