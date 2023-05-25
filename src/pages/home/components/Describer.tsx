import React from "react";
import Skeleton from "../../../components/UI/Skeleton";
import Typer from "../../../components/Typer";
import SocialMediaLinks from "../../../components/social-media-links";
import { useHomeContext } from "../contexts/useHomeContext";

export default function Describer() {
  const { appQuery } = useHomeContext();
  const app = appQuery?.app;
  return (
    <div
      className="
          transition-all
          w-full h-full py-4
          flex flex-col gap-3
          justify-center md:justify-start items-center md:items-start 
          text-center md:text-start text-4xl font-bold 
          "
    >
      <SocialMediaLinks
        className="mb-auto py-3 font-normal "

      />
      <Skeleton beforeLoadOptions={{ height: 40 }}>
        <p>{app?.describer?.title}</p>
      </Skeleton>
      <Skeleton beforeLoadOptions={{ height: 70 }}>
        <Typer
          className="
                text-center md:text-left
                leading-[fit-content]
                text-5xl text-gradient-primary font-extrabold font-archivo 
                "
          words={app?.describer?.sentences}
        />
      </Skeleton>
    </div>
  );
}
