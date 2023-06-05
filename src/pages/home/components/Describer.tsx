import React from "react";
import Skeleton from "../../../components/UI/Skeleton";
import SocialMediaLinks from "../../../components/social-media-links";
import { useHomeContext } from "../contexts/useHomeContext";
import { useTypewriter } from "react-simple-typewriter";
export default function Describer() {
  const { appQuery } = useHomeContext();
  const app = appQuery?.app;
  const hasSentences = Boolean(app?.describer?.sentences?.length);
  const sentences = app?.describer?.sentences;
  const [text] = useTypewriter({
    words: sentences || [""],
    loop: true
  })
  return (
    <div
      className="
          flex
          h-full w-full flex-col
          items-center justify-center gap-3
          py-4 text-center text-4xl font-bold 
          transition-all md:items-start md:justify-start md:text-start 
          "
    >
      <SocialMediaLinks className="mb-auto py-3 font-normal " />
      {hasSentences ? (
        <>
          <Skeleton beforeLoadOptions={{ height: 40 }}>
            <p>{app?.describer?.title}</p>
          </Skeleton>
          <Skeleton beforeLoadOptions={{ height: 70 }}>
            <span
              className="text-gradient-primary font-archivo
                text-center
                text-5xl font-extrabold leading-[fit-content] md:text-left "
            >
            
              <span>{text} |</span>
            </span>
          </Skeleton>
        </>
      ) : null}
    </div>
  );
}
