import { useEffect, useReducer, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};
const VIEW_FORMATTER = Intl.NumberFormat(undefined, { notation: "compact" });

function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;
    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);
  return (
    <div
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
      className="flex flex-col gap-2"
    >
      {/*thumbnail*/}
      <a href={`/watch?v-${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt="Thumbnail"
          className="rounded-xl block w-full h-full object-cover"
        />
        <div className="absolute bottom-1 right-1  bg-black/75 text-white/80 text-sm rounded px-1.5 ">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 rounded-xl ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        ></video>
      </a>
      {/*everything under thumbnail*/}
      <div className="flex gap-2">
        {/*profile pic*/}
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt="profile pic"
            className="rounded-full w-12 h-12"
          />
        </a>
        {/*everything next to pic*/}
        <div className="flex flex-col gap-1">
          {/*title*/}
          <a href={`/watch?v=${id}`} className="font-bold ">
            <div>{title}</div>
          </a>
          {/*channel name*/}
          <a href={`/@${channel.id}`} className=" text-sm  text-gray-400 ">
            {channel.name}
          </a>
          {/*views + date*/}
          <div className="text-sm  text-gray-400">
            {VIEW_FORMATTER.format(views)} Views &#8226;
            {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGridItem;
//border-4 border-red-700
