import React from "react";
import Skeleton from "./UI/Skeleton";
import { iLink } from "../types";
import Title from "./UI/Title";
import { Icon } from "@iconify/react";

type Props = {
  link: iLink | null;
  isLoading: boolean;
};
export default function ProductLink(props: Props) {
  const { link, isLoading } = props || {};
  //if its is already loaded and the products doesn't exist return null
  if (!link && !isLoading) return null;
  const shouldShowSkeleton = !link && isLoading;

  return (
      <a
        className="flex  gap-4 "
        href={link?.url || ""}
        target="_blank"
        rel="noreferrer"
      >
        {shouldShowSkeleton ? (
          <Skeleton className="w-14 h-14" />
        ) : (
          <Icon icon={link?.icon || ""} />
        )}
        {shouldShowSkeleton ? (
          <Skeleton beforeLoadOptions={{ width: "100%", height: "56px" }} />
        ) : (
          <div className="flex flex-col items-start gap-3 text-sm">
            <span className="items-start text-left text-base border-dashed border-b border-white/30 hover:border-indigo-400">
              {link?.name}
            </span>
          </div>
        )}
      </a>
  );
}
