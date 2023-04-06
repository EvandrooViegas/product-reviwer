import { SanityImageAssetDocument } from "@sanity/client"

export interface iIcon {
    icon: string,
    name: string
}

export interface _iIcon {
    icon: SanityImageAssetDocument,
    name: string
}