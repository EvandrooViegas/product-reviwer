import { cardsConfig } from "../../config";
import { iCard } from "../components/UI/CardList";
import { iProduct } from "../types";
import trimString from "../utils/trim-string";

export const formatProductsToCards = (
  products: iProduct[] | null
): iCard[] | null => {
  return (
    products?.map((product) => ({
      id: product._id,
      image: product.banner,
      text: product.name,
      type: product._type,
      date: product.formated_date,
      cupom: product.cupom,
      description: trimString(product.description || "", {
        end: cardsConfig.maxStringLength,
      }),
    })) || null
  );
};
