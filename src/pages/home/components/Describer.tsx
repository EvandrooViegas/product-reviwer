import React from "react";
import SocialMediaLinks from "../../../components/social-media-links";
import { useHomeContext } from "../contexts/useHomeContext";
import { useTypewriter } from "react-simple-typewriter";
import Skeleton from "../../../components/UI/Skeleton";

type Props = {
  isLoading: boolean
}

export default function Describer(props:Props) {
  const { appQuery } = useHomeContext();
  const { isLoading } = props;
  const app = appQuery?.app;
  const hasSentences = Boolean(app?.describer?.sentences?.length);
  const sentences = app?.describer?.sentences;
  const [text] = useTypewriter({
    words: sentences || [""],
    loop: true,
  });
 
  const containerClassName = `
    flex
    h-full w-full flex-col
    items-center justify-center gap-3
    py-4 text-center text-4xl font-bold 
    transition-all md:items-start md:justify-start md:text-start 
  `

  if(isLoading) {
    return (
      <div
      className={containerClassName}
    >
      <SocialMediaLinks isLoading={isLoading} className="mb-auto py-3 font-normal " />
      <Skeleton />
      <Skeleton />
    </div>
    )
  }
  return (
    <div
      className={containerClassName}
    >
      <SocialMediaLinks isLoading={isLoading} className="mb-auto py-3 font-normal " />
      {hasSentences ? (
        <>
          <p>{app?.describer?.title}</p>
          <span
            className="text-gradient-primary font-archivo
                text-center
                text-5xl font-extrabold leading-[fit-content] md:text-left "
          >
            <span>{text} |</span>
          </span>
        </>
      ) : null}
    </div>
  );
}
