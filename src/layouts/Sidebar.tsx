import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { Children, ElementType } from "react";

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
      <aside className="w-56 lg:sticky top-0 absolute overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2">
        {/*section1: home + shorts + subscriptions */}
        <LargeSidebarSection>
          {/*home */}

          <LargeSidebarItem isActive={false} Icon={Home} title="Home" url="/" />

          {/*Shorts */}
          <LargeSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
          {/* subscriptions */}
          <LargeSidebarItem
            Icon={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
      </aside>
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
      className="flex flex-col  items-center hover:bg-gray-200 px-6 py-4 hover:rounded-lg transition-all duration-200"
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={`lg:flex gap-3 items-center hover:bg-gray-200 px-6 py-4 rounded-lg transition-all duration-200 hidden ${
        isActive ? "bg-gray-200 font-bold" : undefined
      }`}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = childrenArray.slice(0, visibleItemCount);

  return (
    <div>
      {/*the <p> element should only take any space if the title is given, otherwise it's hidden */}
      <div
        className={`whitespace-nowrap ${
          title ? "ml-4 mt-2 text-lg mb-1" : "hidden"
        }`}
      >
        {title}
      </div>
      {visibleChildren}
    </div>
  );
}
