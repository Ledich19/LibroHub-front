// components/SidebarToggle.client.tsx (клиентский компонент)
"use client"

import { useState } from "react"

export function SidebarToggle() {
  const [open, setOpen] = useState(false)

  return (
    <button onClick={() => setOpen(!open)}>
      {open ? "Close" : "Open"}
    </button>
  )
}
