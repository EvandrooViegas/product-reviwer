import React from "react";
import Skeleton from "./UI/Skeleton";
import { iLink } from "../types";
import Title from "./UI/Title";
import { Icon } from "@iconify/react";

type Props = {
  link: iLink | null;
};
export default function ProductLink(props: Props) {
  const { link } = props || {};
  //if its is already loaded and the products doesn't exist return null
  if (!link) return null; 
  return (
    <a
      className="flex  gap-4 "
      href={link?.url || ""}
      target="_blank"
      rel="noreferrer"
    >
      {link.icon ? <Icon icon={link?.icon || ""} /> : null}
      <div className="flex flex-col items-start gap-3 text-sm">
        <span className="items-start border-b border-dashed border-white/30 text-left text-base hover:border-indigo-400">
          {link?.name}
        </span>
      </div> 
    </a>
  );
}
