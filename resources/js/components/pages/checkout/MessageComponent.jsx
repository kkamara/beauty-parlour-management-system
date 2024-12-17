import React from "react"

export default function MessageComponent({ message, }) {
  return (
    <section>
      <h3 className="text-center">{message}</h3>
    </section>
  )
}
