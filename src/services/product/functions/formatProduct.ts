import { _iProduct, iProduct } from "../../../types";
import formatDate from "../../../utils/format-date";
import formatCupomToText from "../../../formaters/format-cupom-to-text";
import getImageUrl from "../../../utils/get-image-url";

export function formatProduct(_product: _iProduct): iProduct {
    return {
      ..._product,
      image: getImageUrl(_product?.image || _product.banner),
      banner: getImageUrl(_product.banner),
      links: _product.links?.map((link) => ({
        ...link,
      })),
      collections: _product.collections?.map((collection) => ({
        ...collection,
        banner: getImageUrl(collection.banner),
        image: getImageUrl(collection?.image || collection.banner),
        products: [],
        links: [],
        formated_date: formatDate(collection._createdAt),
      })),
      formated_date: formatDate(_product._createdAt),
      cupom: _product.cupom ? {
        ..._product.cupom,
        formated_cupom: formatCupomToText({ cupom: _product.cupom })
      } : undefined
    };
  }