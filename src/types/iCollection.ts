import { iVideo } from "./iVideo";
import { _iLink, _iProduct, iLink, iProduct, iSanityImage } from "./index";



interface base {
    _id: string;
    name: string,
    description: string,
    _type: string,
    _createdAt: string,
    video: iVideo,
}
export interface  iCollection extends base {
    image: string,
    banner: string,
    links: iLink[]
    products: iProduct[],
    formated_date: string
}   

export interface _iCollection extends base {
    image: iSanityImage,
    banner: iSanityImage,
    links: _iLink[]
    products: _iProduct[],

}