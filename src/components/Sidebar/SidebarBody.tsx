
import Link from "next/link";

import { BookIcon,  HomeIcon,  LibraryBigIcon,  LogInIcon, UserPenIcon } from "lucide-react";
import Image from "next/image";

const SidebarBody = () => {
  return (

   
    <div
      data-slot="sidebar-body"
      data-sidebar="body"
      className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    >


      
      <ul className="menu bg-base-200 rounded-box w-56">
    <li>
      <Link href="/">
       {/* <HomeIcon /> */}
       <Image src="/home_icon.png" alt="Logo" width={50} height={50} />
        Головна
      </Link>
    </li>
    <li>
      <Link href="/authors">
      {/* <UserPenIcon /> */}
      <Image src="/author_icon.png" alt="Logo" width={50} height={50} />
        Автори
      </Link>
    </li>
    <li>
      <Link href="/series">
      {/* <LibraryBigIcon /> */}
      <Image src="/series_icon.png" alt="Logo" width={50} height={50} />
        Серіі
      </Link>
    </li>
    <li>
      <Link href="/books">
       {/* <BookIcon /> */}
       <Image src="/book_icon.png" alt="Logo" width={50} height={50} />
        Книги
      </Link>
    </li>
    <li>
      <Link href="/auth/login">
        {/* <LogInIcon /> */}
        <Image src="/login_icon.png" alt="Logo" width={50} height={50} />
        Item 3
      </Link>
    </li>
  </ul>
</div>
  )
}

export default SidebarBody