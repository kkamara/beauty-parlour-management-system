import React, { useEffect, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"

import ServiceComponent from "./ServiceComponent"
import { HAIR_TREATMENT_PRODUCT_ID, } from "../../../constants"
import { addItemToCart, } from "../../../redux/actions/addToCartActions"
import { getCart, } from "../../../redux/actions/cartActions"

export default function HairTreatmentComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    cart: state.cart,
    addToCart: state.addToCart,
  }))

  useEffect(() => {
    if (
      false === state.addToCart.loading &&
      typeof state.addToCart.data === "object" &&
      null !== state.addToCart.data
    ) {
      dispatch(getCart())
    }
  }, [state.addToCart])

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
      if (
        !state.cart.loading &&
        typeof state.cart.data === 'object' &&
        null !== state.cart.data
      ) {
        if (state.cart.data.data.length) {
          return alert("The cart already has an item.")
        }
      }
      dispatch(addItemToCart(HAIR_TREATMENT_PRODUCT_ID))
    }
  }

  return (
    <div className='container hair-styling-container'>
      <Helmet>
        <title>Hair Treatment - Services - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <ServiceComponent
          title={"Hair Treatment Service"}
          addToCart={addToCart}
          Text={() => <>
            Consequat sunt ex id nulla culpa exercitation. Culpa adipisicing incididunt sit sit fugiat velit aute exercitation Lorem est pariatur sint deserunt nisi. Fugiat veniam eu esse esse voluptate consequat excepteur ut anim. Anim id mollit mollit amet dolor ipsum deserunt nostrud irure officia ut nostrud ut anim. Est eu est ea proident aliquip dolor exercitation cupidatat aliqua duis excepteur mollit. Et laboris minim culpa consectetur consequat excepteur occaecat ea cillum culpa aliquip culpa. Est minim incididunt consectetur anim.
            <br/>
            Duis mollit voluptate id id esse quis excepteur incididunt laboris deserunt excepteur. Sit pariatur duis eu anim sint excepteur ad deserunt nulla laboris excepteur excepteur occaecat. Nostrud sunt qui laborum consequat voluptate qui. In incididunt aute eu irure sit. Do sunt consequat cupidatat ad culpa minim sunt nisi.
            <br/>
            Tempor ex consequat dolor id reprehenderit duis aliquip occaecat deserunt deserunt qui nisi dolore. Adipisicing cillum incididunt sunt cillum Lorem sunt consectetur Lorem sint eiusmod. Nulla nostrud enim eiusmod est culpa. Irure reprehenderit nisi laboris aute cupidatat nostrud consequat sunt occaecat et laborum aute. Sint et nisi veniam voluptate. Amet enim sint Lorem mollit minim veniam dolore sint duis aute in excepteur amet esse.
          </>}
          operationBtnText={"Add To Cart"}
          operationBtnClasses={"btn-success"}
          price={"£50.00"}
        />
      </div>
    </div>
  )
}
