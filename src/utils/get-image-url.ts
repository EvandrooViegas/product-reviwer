import { sanity } from "../lib/sanity"
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageAssetDocument } from "@sanity/client"
const builder = imageUrlBuilder(sanity)

export default function getImageUrl(asset:SanityImageAssetDocument | null) {
  if(!asset) return ""
  return builder.image(asset).url()
}