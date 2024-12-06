import React, { useState, useEffect } from "react"

const Message = ({ message }) => (
  <section>
    <h3 className="text-center">{message}</h3>
  </section>
)

export default function CheckoutResultComponent() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed!");
    }

    if (query.get("cancelled")) {
      setMessage(
        "Order cancelled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <div>
      <Message message={message} />
    </div>
  )
}
