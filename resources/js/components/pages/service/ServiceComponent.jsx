import React from "react"

export default function ServiceComponent({
  title,
  addToCart,
  Text,
  operationBtnText,
  operationBtnClasses,
}) {
  return (
    <div className="col-md-10 offset-md-1">
      <h1>{title}</h1>
      <div className="row">
        <div className="col-md-6">
          <Text />
        </div>
        <div className="col-md-6">
          <div className="text-end">
            <span className="service-cost me-4">£50.00</span>
            <button
              className={`btn service-operation-btn ${operationBtnClasses || null}`}
              onClick={addToCart}
            >
              {operationBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
