import React from "react";
import { TbSquareRounded } from "react-icons/tb"
import { TbLayoutGrid } from "react-icons/tb"

type Props = {
  type: string | undefined;
};
export default function ItemTypeIndicator(props: Props) {
  const { type } = props;
  if (!type) return null;
  const itemType = type.includes("product") ? "Produto" : "Coleção"
  const Icon = type.includes("product") ? TbSquareRounded : TbLayoutGrid  
  return <div className="text-sm transition-all border border-dashed  px-4 py-1 rounded border-white/20 hover:border-white/30 flex gap-2 cursor-pointer items-center justify-center">
    <Icon />
    <span>{itemType}</span>

    </div>;
}
