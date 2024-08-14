import {
  ChevronDown,
  Clapperboard,
  Home,
  Library,
  Repeat,
  ShowerHead,
  ChevronUp,
  UserPen,
  History,
  ListVideo,
  Youtube,
  SquarePlay,
  Clock8,
  ThumbsUp,
  Scissors,
  TrendingUp,
  ShoppingBag,
  Music,
  RadioTower,
  Gamepad2,
  Newspaper,
  Trophy,
  GraduationCap,
  Shirt,
} from "lucide-react";
import { Children, ElementType, useState } from "react";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";

function Sidebar() {
  const { isLargeOpen, isSmallOpen } = useSidebarContext();
  return (
    <>
      {/* small sidebar */}
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>

      {/* large sidebar */}
      <aside
        className={`w-56 lg:sticky top-0 absolute overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 hidden ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen  " : "hidden"}`}
      >
        {/*section1: home + shorts + subscriptions */}
        <LargeSidebarSection>
          {/*home */}

          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />

          {/*Shorts */}
          <LargeSidebarItem
            IconOrImgUrl={Repeat}
            title="Shorts"
            url="/shorts"
          />
          {/* subscriptions */}
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="You" visibleItemCount={7}>
          <LargeSidebarItem
            IconOrImgUrl={UserPen}
            title="Your channel"
            url="/"
          />
          <LargeSidebarItem IconOrImgUrl={History} title="History" url="/" />

          <LargeSidebarItem
            IconOrImgUrl={SquarePlay}
            title="Your videos"
            url="/"
          />
          <LargeSidebarItem IconOrImgUrl={Clock8} title="Watch later" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={ThumbsUp}
            title="Liked videos"
            url="/"
          />
          <LargeSidebarItem
            IconOrImgUrl={Scissors}
            title="Your clips"
            url="/"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={3}>
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore" visibleItemCount={4}>
          <LargeSidebarItem
            IconOrImgUrl={TrendingUp}
            title="Trending"
            url="/"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/"
          />
          <LargeSidebarItem IconOrImgUrl={Music} title="Music" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Movies & TV"
            url="/"
          />
          <LargeSidebarItem IconOrImgUrl={RadioTower} title="Live" url="/" />
          <LargeSidebarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/" />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/" />
          <LargeSidebarItem IconOrImgUrl={Trophy} title="Sports" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={GraduationCap}
            title="Learning"
            url="/"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/"
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
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
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
      {typeof IconOrImgUrl === "string" ? (
        <img
          src={IconOrImgUrl}
          alt="Channel Icon"
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}

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

  const [isExpanded, setIsExpanded] = useState(false);

  const showExpandButton = childrenArray.length > visibleItemCount;

  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

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
      {showExpandButton && (
        <button
          onClick={() => setIsExpanded((e) => !e)}
          className={`hover:bg-gray-200 px-6 py-4 w-full rounded-lg flex items-center gap-5 `}
        >
          <ButtonIcon className="h-6 w-6" />
          <div className="">{isExpanded ? "Show less" : "Show more"}</div>
        </button>
      )}
    </div>
  );
}
