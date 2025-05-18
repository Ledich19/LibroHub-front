
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-base-200 text-base-content flex flex-col">

      <SidebarHeader />
      <SidebarBody />
      <SidebarFooter />

    </aside>
  )
}
export default Sidebar;
