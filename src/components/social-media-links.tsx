import { useMainLayout } from "./UI/layouts/MainLayout";
import Skeleton from "./UI/Skeleton";
import Avatar from "./UI/Avatar";
import React from "react";
import { iSocial } from "../types";
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
  const { direction = "horizontal", gap = "10px", iconClass } = props;
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
  return (
    <Skeleton key={social?.name} height={40} circle>
      <a href={social?.link} target="_blank">
        <Avatar
          className={iconClass}
          src={social?.icon}
          alt={social?.name}
          toolipText={social?.name}
        />
      </a>
    </Skeleton>
  );
}
