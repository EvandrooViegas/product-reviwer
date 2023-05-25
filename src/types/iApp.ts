import { iDescriber } from "./iDescriber"
import { iSwiper, _iSwiper } from "./iSwiper"
import { iYoutubeVideo } from "./iYoutubeVideo"
import { iSocial, iSanityImage, _iSocial } from "./index"
interface base  {
    name: string,
    video?: iYoutubeVideo,
    describer?: iDescriber,
}
export  interface iApp extends base  {
    avatar: string,
    socials: iSocial[]
    swiper: iSwiper
} 

export interface _iApp extends base {
    avatar: iSanityImage,
    socials: _iSocial[]
    swiper: _iSwiper

}