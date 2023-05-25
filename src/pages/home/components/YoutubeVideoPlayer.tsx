import React from "react";
import getYoutubeVideoId from "../../../utils/get-youtube-video-id";
import { useHomeContext } from "../contexts/useHomeContext";
import Skeleton from "../../../components/UI/Skeleton";
import Youtube from "react-youtube";
import Title from "../../../components/UI/Title";
import useLayout from "../../../hooks/useLayout";
import { AnimateOnView } from "../../../components/AnimateOnView";
export function YoutubeVideoPlayer() {
  //video size
  const { width, height } = useLayout();
  const videoWidth = width;
  const videoHeight = height > 400 ? 400 : height * 0.55;

  //data
  const { appQuery } = useHomeContext();
  const app = appQuery?.app;
  const video = app?.video;
  return (
    <AnimateOnView
      animate={{ x: [100, 0], opacity: [0.4, 1], transition: { delay: 0.2 } }}
      shouldAnimateOnce={true}
      className="flex flex-col items-stretch gap-5"
    >
      <Title>{video?.title}</Title>
      <div className="relative" style={{ height: videoHeight, width: "100%" }}>
        <div className="absolute inset-0 rounded overflow-hidden">
          {app?.video ? (
            <Youtube
              videoId={getYoutubeVideoId(video?.url)}
              opts={{ width: "100%", height: videoHeight }}
            />
          ) : (
            <Skeleton
              style={{ width: videoWidth, height: videoHeight }}
              visible={true}
            />
          )}
        </div>
      </div>
      <p className="text-sm text-neutral-400">{video?.description}</p>
    </AnimateOnView>
  );
}
