import { Icon } from "@iconify/react";
import React, { useState, memo, createContext, useContext } from "react";
import { iSocial } from "../types";
import { useMainLayout } from "./UI/layouts/MainLayout/contexts/MainLayoutContext";
import Tooltip from "./Tooltip";
import Skeleton from "./UI/Skeleton";
type Props = {
  isLoading: boolean;

  direction?: "horizontal" | "vertical";
  gap?: string;
  iconClass?: React.HTMLAttributes<HTMLImageElement>["className"];
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;


const SocialMediaLinks = (props: Props) => {
  const { app } = useMainLayout();

  const {
    isLoading = false,
    direction = "horizontal",
    gap = "10px",
    iconClass = "transition rounded-md cursor-pointer w-6 object-fill  hover:scale-110",
  } = props;
  const socialMediaLinks = app?.socials;
  const fakeList = Array(4).fill(0)
  const list = isLoading ? fakeList : socialMediaLinks
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
      {list?.map((social) => (
        <SocialMediaLink
          social={social}
          iconClass={iconClass}
          key={social.link}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};



export default memo(SocialMediaLinks);
function SocialMediaLink({
  social,
  isLoading
}: {
  social: iSocial;
  iconClass: React.HTMLAttributes<HTMLImageElement>["className"];
  isLoading: boolean;
}) {
  const [isHovering, setIsHovering] = useState(false);
  if(isLoading) return <Skeleton width={50} height={50} circle />
  if (!social) return null;
  return (
    <a
      href={social.link}
      target="_blank"
      rel="noreferrer"
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Icon icon={social.icon.icon} />
      <Tooltip shouldShow={isHovering} label={social.name} />
    </a>
  );
}


