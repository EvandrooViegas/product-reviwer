import { sanity } from "../lib/sanity";
import { _iProduct, iLink, iProduct, iSanityImage } from "../types";
import formatDate from "../utils/format-date";
import getImageUrl from "../utils/get-image-url";
import groq from "groq";

function formatProduct(_product:_iProduct):iProduct {
    return {
        ..._product, 
        image: getImageUrl(_product?.image || _product.banner), 
        banner: getImageUrl(_product.banner), 
        links: _product.links.map((link) => ({
            ...link,
            icon: getImageUrl(link?.icon) 
        })),
        collections: _product.collections?.map(collection => ({
            ...collection,
            banner: getImageUrl(collection.banner),
            image: getImageUrl(collection?.image || collection.banner),
            products: [],
            links: [],
            formated_date: formatDate(collection._createdAt)
        })),
        formated_date: formatDate(_product._createdAt),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
        
    }
}

export async function getProducts() {
    const result:_iProduct[] = await sanity.fetch(`
        *[_type == 'product']{
            ...,
            links[]{
            ...,
            "icon": icon->icon
            }
        } | order(_createdAt desc)`
    );

    //format the image and banner from refs to url's 
    const products:iProduct[] = result.map(_product => formatProduct(_product))
   return products
}

export async function getProduct(productId: string) {
    const _product:_iProduct = await sanity.fetch(
        `*[_type == "product" && _id == '${productId}'][0]{
            ...,
          "collections": *[_type == "collection" && '${productId}' in products[]._ref],
          links[]{
            ...,
            "icon": icon->icon
          }
        }`
    )
    const product:iProduct = formatProduct(_product)
    return product
}