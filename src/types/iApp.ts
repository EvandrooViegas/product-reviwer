import { iDescriber } from "./iDescriber"
import { iSocial, iSanityImage, _iSocial } from "./index"
interface base  {
    name: string,
    video?: string,
    describer?: iDescriber
}
export  interface iApp extends base  {
    avatar: string,
    socials: iSocial[]
} 

export interface _iApp extends base {
    avatar: iSanityImage,
    socials: _iSocial[]
}