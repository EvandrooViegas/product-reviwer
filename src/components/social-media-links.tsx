import Skeleton from "./UI/Skeleton";
import { Icon } from '@iconify/react';
import React, { useState } from "react";
import { iSocial } from "../types";
import { useMainLayout } from "./UI/layouts/MainLayout/contexts/MainLayoutContext";
import Tooltip from "./Tooltip";
type Props = {
  direction?: "horizontal" | "vertical";
  gap?: string;
  iconClass?: React.HTMLAttributes<HTMLImageElement>["className"];
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function SocialMediaLinks(props: Props) {
  const { app } = useMainLayout();
  const {
    direction = "horizontal",
    gap = "10px",
    iconClass = "transition rounded-md cursor-pointer w-6 object-fill  hover:scale-110",
  } = props;
  const socialMediaLinks = app?.socials;
  const fakeSocialMediaLinks = Array(3).fill(0);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap,
      }}
      className="items-stretch "
      {...props}
    >
      {socialMediaLinks
        ? socialMediaLinks.map((social) => (
            <SocialMediaLink
              social={social}
              iconClass={iconClass}
              key={social.link}
            />
          ))
        : fakeSocialMediaLinks.map((social) => (
            <SocialMediaLink
              social={social}
              iconClass={iconClass}
              key={social.link}
            />
          ))}
    </div>
  );
}

function SocialMediaLink({
  social,
  iconClass,
}: {
  social: iSocial;
  iconClass: React.HTMLAttributes<HTMLImageElement>["className"];
}) {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <Skeleton key={social?.name} height={40} circle>
      <a href={social?.link} target="_blank" rel="noreferrer" className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <Icon icon={social.icon} />
        <Tooltip shouldShow={isHovering} label={social.name} />

      </a>
    </Skeleton>
  );
}
