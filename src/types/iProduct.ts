import { iCupom } from "./iCupom";
import { iVideo } from "./iVideo";
import {
  _iCollection,
  iCollection,
  _iLink,
  iLink,
  iSanityImage,
} from "./index";

interface base {
  video: iVideo;
  _id: string;
  name: string;
  description?: string;
  _type: string;
  _createdAt: string;
  cupom?: iCupom;
  
}

export interface iProduct extends base {
  image: string;
  banner: string;
  links: iLink[];
  collections: iCollection[];
  formated_date: string;
}

export interface _iProduct extends base {

  image: iSanityImage;
  banner: iSanityImage;
  links: _iLink[];
  collections: _iCollection[];
}
