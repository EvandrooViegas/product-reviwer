import React from "react";
import { Divider } from "@mantine/core";
import Skeleton, { SkeletonProvider } from "./UI/Skeleton";
import { iCollection } from "../types";
import ShadowHoverImage from "./ShadowHoverImage";
import Title from "./UI/Title";
import trimString from "../utils/trim-string";
import { Link } from "react-router-dom";

type Props = {
  collection: iCollection | null;
  isLoading: boolean;
};
export default function CollectionRowCard(props: Props) {
  const { collection, isLoading } = props || {};
  //if its is already loaded and the products doesn't exist return null
  if (!collection && !isLoading) return null;

  return (
    <Link to={`/collection/${collection?._id}`} className="transition-all  flex w-full items-center gap-4 p-4 rounded-xl border border-white/20 border-dashed hover:border-white/30">
      <img
        className="h-20 w-20 rounded-xl object-cover"
        src={collection?.banner}
      />
      <div className="flex flex-col gap-3 ">
        <Title className="items-start text-left text-sm my-0">
          {collection?.name}
        </Title>
        <p className="w-3/4 text-xs text-neutral-500">
          {collection?.description
            ? trimString(collection.description, { end: 140 })
            : null}
        </p>
      </div>
    </Link>
  );
}
