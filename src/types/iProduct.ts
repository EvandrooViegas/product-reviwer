import { _iLink, iLink } from "./iLink";
import iSanityImage from "./iSanityImage";

export interface iProduct {
    _id: string;
    name: string,
    description?: string, 
    image: string,
    banner: string,
    links: iLink[]
    _type: string
}

export interface _iProduct {
    _id: string;
    name: string,
    description?: string, 
    image: iSanityImage,
    banner: iSanityImage,
    links: _iLink[],
    _type: string

}