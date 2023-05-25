
import { iSanityImage } from "./index"
interface base {
    link: string,
    icon: string | iSanityImage,
    name: string
}
export interface iSocial extends base {
    icon: string,
}

export interface _iSocial extends base {
    icon: string
}