import React from "react";
import Title from "./UI/Title";
import trimString from "../utils/trim-string";
import { Link } from "react-router-dom";
import useWindowRole from "../hooks/useWindowRole";

type Element = {
  _id: string;
  banner: string;
  name: string;
  description?: string;
  link: string;
};
type Props = {
  element: Element | null;
};
export default function RowCard(props: Props) {
  const { element } = props || {};
  //if its is already loaded and the products doesn't exist return null
  if (!element) return null;
  const { role } = useWindowRole();

  return (
    <Link
      to={element.link || ""}
      className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/20 px-4 py-3 transition-all hover:border-white/30"
    >
      <img
        className="h-20 w-20 rounded-xl object-cover"
        src={element?.banner}
      />
      <div className="flex flex-col gap-3 ">
        <Title className="my-0 items-start text-left text-sm" hideUnderline>
          {element?.name}
        </Title>
        <p className=" text-xs text-neutral-500">
          {element?.description
            ? trimString(element.description, { end: role === "sm" ? 60 : 140 })
            : null}
        </p>
      </div>
    </Link>
  );
}
