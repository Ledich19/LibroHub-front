import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";

const SidebarFooter = () => {
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
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="font-bold truncate">John Doe</div>
            <div className="text-sm opacity-50 truncate">ledich@example.com</div>
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
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarFooter;
