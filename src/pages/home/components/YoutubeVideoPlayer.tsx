import React from "react";
import getYoutubeVideoId from "../../../utils/get-youtube-video-id";
import { useHomeContext } from "../contexts/useHomeContext";
import Skeleton from "../../../components/UI/Skeleton";
import Youtube from "react-youtube";
import Title from "../../../components/UI/Title";
import useLayout from "../../../hooks/useLayout";
import { AnimateOnView } from "../../../components/AnimateOnView";
type Props = {
  url?: string;
  shouldAnimate?: boolean;
  isLoading?: boolean;
  showCaptions?: boolean;
};
export function YoutubeVideoPlayer(props: Props) {
  const {
    url,
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
  const video = app?.video;

  const videoUrl = url || video?.url;
  const shouldShowSkeleton =
    "isLoading" in props ? isLoading : appQuery.isLoading;
  if (!videoUrl) return null;

  return (
    <AnimateOnView
      animate={
        shouldAnimate
          ? { opacity: [0.4, 1], transition: { delay: 0.2 } }
          : undefined
      }
      shouldAnimateOnce={true}
      className="flex flex-col items-stretch gap-5"
    >
      {showCaptions ? <Title>{video?.title}</Title> : null}
      <div className="relative" style={{ height: videoHeight, width: "100%" }}>
        <div className="absolute inset-0 overflow-hidden rounded">
          {shouldShowSkeleton ? (
            <Skeleton
              style={{ width: videoWidth, height: videoHeight }}
              visible={true}
            />
          ) : (
            <Youtube
              videoId={getYoutubeVideoId(videoUrl)}
              opts={{ width: "100%", height: videoHeight }}
            />
          )}
        </div>
      </div>
      {showCaptions ? (
        <p className="text-sm text-neutral-400">{video?.description}</p>
      ) : null}
    </AnimateOnView>
  );
}
