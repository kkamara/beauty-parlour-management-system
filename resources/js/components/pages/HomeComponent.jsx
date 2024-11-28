import React, { useEffect, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { Helmet, } from "react-helmet"
import { getUsers, } from '../../redux/actions/usersActions'

import "./HomeComponent.scss"

export default function HomeComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    users: state.users,
  }))

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (
    !state.users.loading &&
    typeof state.users.data === 'object' &&
    null !== state.users.data
  ) {
    console.log('users', state.users.data)
  }
  if (state.users.loading) {
    return <div className="container home-container text-center">
      <Helmet>
        <title>Services - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return (
    <>
      <div className='container home-container'>
        <Helmet>
          <title>Services - {import.meta.env.VITE_APP_NAME}</title>
        </Helmet>
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1>Services</h1>

            <div className="card col-md-3 home-card">
              <div className="card-header">
                <h4>Hair Styling</h4>
              </div>
              <div className="card-body">
                Laborum incididunt culpa irure cupidatat Lorem pariatur aliquip sint id anim est aute aliqua.
              </div>
              <div className="card-footer">
                <div className="text-end">
                  <span className="home-card-cost">£50.00</span>
                  <a className="btn btn-primary" href="/services/hair-styling">
                    Order Online
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card col-md-3 home-card">
              <div className="card-header">
                <h4>Hair Colouring</h4>
              </div>
              <div className="card-body">
                Dolor aliquip enim Lorem ipsum id officia veniam.
              </div>
              <div className="card-footer">
                <div className="text-end">
                  <span className="home-card-cost">£50.00</span>
                  <a className="btn btn-primary" href="#">
                    Order Online
                  </a>
                </div>
              </div>
            </div>

            <div className="card col-md-3 home-card">
              <div className="card-header">
                <h4>Hair Treatment</h4>
              </div>
              <div className="card-body">
                Minim sunt minim officia dolore consectetur non deserunt minim id ex.
              </div>
              <div className="card-footer">
                <div className="text-end">
                  <span className="home-card-cost">£50.00</span>
                  <a className="btn btn-primary" href="#">
                    Order Online
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
