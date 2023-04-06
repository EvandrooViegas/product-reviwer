import { sanity } from "../lib/sanity";
import { _iProduct, iProduct, iSanityImage } from "../types";
import getImageUrl from "../utils/get-image-url";

//formated type with all of the default types but with the image and banner
// types set as iSanityImage 
type iNonFormatedProductImages = {
    image: iSanityImage,
    banner: iSanityImage
} &  iProduct

export async function getProducts() {
    const result:iNonFormatedProductImages[] = await sanity.fetch(`
        *[_type == 'product']{
            ...,
            links[]{
            ...,
            "icon": icon->icon
            }
        } | order(_createdAt desc)`
    );

    //format the image and banner from refs to url's 
    const products:iProduct[] = result.map(product => ({
        ...product,
        image: getImageUrl(product.image ||product.banner ),
        banner: getImageUrl(product.banner)
   }))
   return products
}

