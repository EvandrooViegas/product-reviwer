import { SanityAsset } from "@sanity/image-url/lib/types/types"
import { sanity } from "../lib/sanity"
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageAssetDocument } from "@sanity/client"
const builder = imageUrlBuilder(sanity)

export default function getImageUrl(asset:SanityImageAssetDocument) {
  return builder.image(asset).url()
}