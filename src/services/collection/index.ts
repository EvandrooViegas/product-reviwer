import { sanity } from "../../lib/sanity";
import { _iCollection, iCollection } from "../../types";
import formatDate from "../../utils/format-date";
import getImageUrl from "../../utils/get-image-url";

function formatCollection(_collection: _iCollection): iCollection {
  return {
    ..._collection,
    image: getImageUrl(_collection?.image || _collection.banner),
    banner: getImageUrl(_collection.banner),
    links: _collection.links?.map((link) => ({
      ...link,
    })),
    products: _collection.products?.map((product) => ({
      ...product,
      banner: getImageUrl(product.banner),
      image: getImageUrl(product?.image || product.banner),
      formated_date: formatDate(product?._createdAt),
      links: [],
      collections: [],
    })),
    formated_date: formatDate(_collection._createdAt),
  };
}

export async function getCollections() {
  const result: _iCollection[] = await sanity.fetch(`
        *[_type == 'collection']{
            ...,
            products[]->,
            links[]{
            ...,
            "icon": icon->icon
            }
        } | order(_createdAt desc)
    `);
  //format the image and banner from refs to url's
  if (result) {
    const collection: iCollection[] = result.map(formatCollection);

    return collection;
  }
  return null;
}

export async function getCollection(collectionId: string) {
  const _collection: _iCollection = await sanity.fetch(
    `*[_type == "collection" && _id == '${collectionId}'][0]{
            ...,
          products[]->,
          links[]->{
            ...,
            "icon": icon->icon
          }
        }`
  );
  const collection: iCollection = formatCollection(_collection);
  return collection;
}
