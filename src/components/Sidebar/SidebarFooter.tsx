'use client';
import { EllipsisVerticalIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { User } from "../../../generated/graphql";

interface IProps {
  viewer?: User
}


const SidebarFooter = ({ viewer }: IProps) => {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };
 

  return (
    <div className="dropdown dropdown-top w-full flex justify-end ">
      <div className="dropdown dropdown-right dropdown-end w-full p-2">

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost w-full flex items-center justify-between gap-2 text-left p-0"
        >

          <div className="avatar">
            <div className="w-10 rounded">
              <img
                alt="User avatar"
                src={viewer?.avatarUrl ?? "./image-not-available-user.webp"}
              />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="font-bold truncate">{viewer?.name ?? "..."}</div>
            <div className="text-sm opacity-50 truncate">{viewer?.email ?? "..."}</div>
          </div>
          <EllipsisVerticalIcon />
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link href="/user/1" className="justify-between">
              Profile
            </Link>
          </li>
          <li><a>Settings</a></li>

          <li><Link href="/login"><LogInIcon /> Login</Link ></li>
          <li><button onClick={handleLogout}><LogOutIcon /> Logout</button></li>

        </ul>
      </div>
    </div>
  );
};

export default SidebarFooter;
