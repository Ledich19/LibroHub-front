"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Breadcrumbs = () => {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/")
          const isLast = i === segments.length - 1
          const label = decodeURIComponent(seg.replace(/-/g, " "))

          return (
            <li key={href}>
              {isLast ? (
                label
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
