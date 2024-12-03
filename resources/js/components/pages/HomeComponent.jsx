import React from 'react'
import { Helmet, } from "react-helmet"

import "./HomeComponent.scss"

export default function HomeComponent() {
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
                  <span className="home-card-cost me-2">£50.00</span>
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
                  <span className="home-card-cost me-2">£50.00</span>
                  <a className="btn btn-primary" href="/services/hair-colouring">
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
                  <span className="home-card-cost me-2">£50.00</span>
                  <a className="btn btn-primary" href="/services/hair-treatment">
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
