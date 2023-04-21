import {
  _iCollection,
  iCollection,
  _iLink,
  iLink,
  iSanityImage,
} from "./index";

export interface iProduct {
  _id: string;
  name: string;
  description?: string;
  image: string;
  banner: string;
  links: iLink[];
  _type: string;
  collections: iCollection[],
  formated_date: string,
  _createdAt: string
}

export interface _iProduct {
  _id: string;
  name: string;
  description?: string;
  image: iSanityImage;
  banner: iSanityImage;
  links: _iLink[];
  _type: string;
  collections: _iCollection[],
  _createdAt: string
}
