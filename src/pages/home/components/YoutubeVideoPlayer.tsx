import React from "react";
import getYoutubeVideoId from "../../../utils/get-youtube-video-id";
import { useHomeContext } from "../contexts/useHomeContext";
import Skeleton from "../../../components/UI/Skeleton";
import Youtube from "react-youtube";
import Title from "../../../components/UI/Title";
import useLayout from "../../../hooks/useLayout";
import { AnimateOnView } from "../../../components/AnimateOnView";
import { iVideo } from "../../../types/iVideo";
import TrimmedText from "../../../components/TrimmedText";
type Props = {
  video?: iVideo;
  shouldAnimate?: boolean;
  isLoading?: boolean;
  showCaptions?: boolean;
};
export function YoutubeVideoPlayer(props: Props) {
  const {
    video,
    shouldAnimate = true,
    isLoading = false,
    showCaptions = true,
  } = props;
  //video size
  const { width, height } = useLayout();
  const videoWidth = width;
  const videoHeight = height > 400 ? 400 : height * 0.55;

  //data
  const { appQuery } = useHomeContext();
  const app = appQuery?.app;

  const videoUrl = video?.url || app?.video?.url;
  const videoTitle = video?.title || app?.video?.title;
  const videoDescription = video?.description || app?.video?.description;

  const shouldShowSkeleton =
    "isLoading" in props ? isLoading : appQuery.isLoading;

  if (!videoUrl) return null;
  if (shouldShowSkeleton)
    return (
      <Skeleton
        style={{ width: videoWidth, height: videoHeight }}
        visible={true}
      />
    );
  return (
    <AnimateOnView
      animate={
        shouldAnimate
          ? { opacity: [0.4, 1], transition: { delay: 0.2 } }
          : undefined
      }
      shouldAnimateOnce={true}
      className="flex flex-col items-stretch gap-2.5"
    >
      {showCaptions ? <Title className="text-base mb-1" alignment="left">{videoTitle}</Title> : null}
      <div className="relative" style={{ height: videoHeight, width: "100%" }}>
        <div className="absolute inset-0 overflow-hidden rounded">
          <Youtube
            videoId={getYoutubeVideoId(videoUrl)}
            opts={{ width: "100%", height: videoHeight }}
          />
        </div>
      </div>
      {showCaptions ? (
        <TrimmedText
          text={videoDescription}
          className="flex flex-col items-center gap-3 text-xs text-neutral-400"
        />
      ) : null}
    </AnimateOnView>
  );
}
