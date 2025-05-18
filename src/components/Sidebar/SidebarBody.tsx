
import Link from "next/link";

import { BookIcon,  HomeIcon,  LogInIcon } from "lucide-react";

const SidebarBody = () => {
  return (
    <div
      data-slot="sidebar-body"
      data-sidebar="body"
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    ><ul className="menu bg-base-200 rounded-box w-56">
    <li>
      <Link href="/app">
       <HomeIcon />
        Item 2
      </Link>
    </li>
    <li>
      <Link href="/app/books">
       <BookIcon />
        Item 1
      </Link>
    </li>
    <li>
      <Link href="/app/auth/login">
        <LogInIcon />
        Item 3
      </Link>
    </li>
  </ul>
</div>
  )
}

export default SidebarBody