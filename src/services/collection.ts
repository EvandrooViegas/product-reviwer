import { sanity } from "../lib/sanity";
import {
  _iCollection,
  _iProduct,
  iCollection,
} from "../types";
import formatDate from "../utils/format-date";
import getImageUrl from "../utils/get-image-url";

function formatCollection(_collection: _iCollection): iCollection {
  return {
    ..._collection,
    image: getImageUrl(_collection?.image || _collection.banner),
    banner: getImageUrl(_collection.banner),
    links: _collection.links?.map((link) => ({
      ...link,
      icon: getImageUrl(link.icon)
    })),
    products: _collection.products?.map((product) => ({
      ...product,
      banner: getImageUrl(product.banner),
      image: getImageUrl(product?.image || product.banner),
      formated_date: formatDate(product?._createdAt),
      links: [],
      collections: []
    })),
    formated_date: formatDate(_collection._createdAt),
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
    const collection: iCollection[] = result.map(formatCollection);
    return collection;
}

export async function getCollection(collectionId: string) {
  const _collection: _iCollection = await sanity.fetch(
    `*[_type == "collection" && _id == '${collectionId}'][0]{
            ...,
          products[]->,
          links[]{
            ...,
            "icon": icon->icon
          }
        }`
  );
  const collection: iCollection = formatCollection(_collection);
  return collection;
}
