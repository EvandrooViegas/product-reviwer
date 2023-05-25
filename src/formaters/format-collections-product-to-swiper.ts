import { iCupom } from "../types/iCupom";
import { IElement } from "../types/iSwiper";
import formatDate from "../utils/format-date";
import formatCupomToText from "./format-cupom-to-text";

type ISwiper = {
  banner: string;
  title: string;
  _id: string;
  _type: string;
  date: string;
  description: string;
  cupom: iCupom | null;
};
export default function formatCollectionProductToSwiper(
  elements: IElement | undefined
): ISwiper[] | null {
  if (!elements) return null;
  return elements.map((element) => ({
    banner: element.banner,
    title: element.name,
    _id: element._id,
    _type: element._type,
    date: formatDate(element._createdAt),
    description: element.description || "",
    cupom: "cupom" in element && element.cupom !== undefined ? {
      ...element.cupom,
      formated_cupom: formatCupomToText({ cupom: element.cupom })
    } : null 
  }));
}
