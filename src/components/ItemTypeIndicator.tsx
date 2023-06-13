import React from "react";
import { TbSquareRounded } from "react-icons/tb"
import { TbLayoutGrid } from "react-icons/tb"
import { Link } from "react-router-dom";

type Props = {
  type: string | undefined;
};
export default function ItemTypeIndicator(props: Props) {
  const { type } = props;
  if (!type) return null;
  const isProduct = type.includes("product")
  const itemType = isProduct ? "Produto" : "Coleção"
  const href = isProduct ? "/#produtos" : "/#colecoes"

  const Icon = type.includes("product") ? TbSquareRounded : TbLayoutGrid  
  return <Link to={href} className="text-sm transition-all border  rounded border-white/20 hover:border-white/30 flex gap-2 cursor-pointer items-center justify-center border-dashed  px-4 py-1">
    <Icon />
    <span>{itemType}</span>

    </Link>;
}
