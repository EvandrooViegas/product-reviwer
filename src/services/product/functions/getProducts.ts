import { sanity } from "../../../lib/sanity";
import { _iProduct, iProduct } from "../../../types";
import { formatProduct } from "./formatProduct";

type IProductLoadMore = {
  initialLoadQuantity: number;
};

export async function getProducts(options = {} as IProductLoadMore) {
  const { initialLoadQuantity } = options;
  const query = `
    *[_type == 'product']{
      ...,
      links[]{
        ...,
        "icon": icon->icon
      },
      cupom->
    } | order(_createdAt desc) 
  `;
  const result: _iProduct[] = await sanity.fetch(query);
  //format the image and banner from refs to url's
  if (!result) return null;
  const products: iProduct[] = result.map(formatProduct);
  return products;
}

