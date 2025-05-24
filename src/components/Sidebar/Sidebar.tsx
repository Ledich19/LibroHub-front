
import { User } from "../../../generated/graphql";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  viewer?: User
}

const Sidebar = ({ viewer }: SidebarProps) => {
  return (
    <aside className="w-64 bg-base-200 text-base-content flex flex-col h-screen  flex-shrink-0">

      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter viewer={viewer} />

    </aside>
  )
}
export default Sidebar;
