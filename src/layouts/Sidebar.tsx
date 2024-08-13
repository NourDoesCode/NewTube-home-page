import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType } from "react";

function Sidebar() {
  return (
    <>
      {/* sidebar for small screens */}
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden ">
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>

      {/* sidebar for large screens */}
    </>
  );
}

export default Sidebar;

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className="flex flex-col  items-center hover:bg-gray-200 px-6 py-4 hover:rounded-lg"
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}
