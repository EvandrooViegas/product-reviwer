import iSanityImage from "./iSanityImage"

export interface iApp {
    name: string,
    avatar: string,
    video?: string
}

export interface _iApp {
    name: string,
    avatar: iSanityImage,
    video?: string
}