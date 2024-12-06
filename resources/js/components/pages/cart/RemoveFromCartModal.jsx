import React from "react"

export default function RemoveFromCartModal({
  removeFromCart,
  name,
  price,
}) {
  const handleRemoveFromCart = () => {
    removeFromCart()
  }

  return (
    <>
      <button
        className="btn btn-danger ms-4"
        data-bs-toggle="modal"
        data-bs-target="#removeFromCartModal"
      >
        Remove From Cart
      </button>
      <div
        className="modal fade"
        id="removeFromCartModal"
        tabIndex="-1"
        aria-labelledby="removeFromCartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="removeFromCartModalLabel">Remove {name} Service</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {price}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleRemoveFromCart}
                data-bs-dismiss="modal"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
