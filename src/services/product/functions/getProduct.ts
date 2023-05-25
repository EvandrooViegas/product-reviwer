import { sanity } from "../../../lib/sanity";
import { _iProduct, iProduct } from "../../../types";
import { formatProduct } from "./formatProduct";

export async function getProduct(productId: string) {
    const _product: _iProduct = await sanity.fetch(
      `*[_type == "product" && _id == '${productId}'][0]{
              ...,
            "collections": *[_type == "collection" && '${productId}' in products[]._ref],
            links[]{
              ...,
              "icon": icon->icon
            },
            cupom->
          }`
    );
    const product: iProduct = formatProduct(_product);
    return product;
  }
  