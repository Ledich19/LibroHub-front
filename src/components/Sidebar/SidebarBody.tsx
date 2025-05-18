
import Link from "next/link";

import { BookIcon,  HomeIcon,  LibraryBigIcon,  LogInIcon, UserPenIcon } from "lucide-react";

const SidebarBody = () => {
  return (
    <div
      data-slot="sidebar-body"
      data-sidebar="body"
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    ><ul className="menu bg-base-200 rounded-box w-56">
    <li>
      <Link href="/">
       <HomeIcon />
        Головна
      </Link>
    </li>
    <li>
      <Link href="/authors">
      <UserPenIcon />
        Автори
      </Link>
    </li>
    <li>
      <Link href="/series">
      <LibraryBigIcon />
        Серіі
      </Link>
    </li>
    <li>
      <Link href="/books">
       <BookIcon />
        Книги
      </Link>
    </li>
    <li>
      <Link href="/auth/login">
        <LogInIcon />
        Item 3
      </Link>
    </li>
  </ul>
</div>
  )
}

export default SidebarBody