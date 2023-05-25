import { _iCollection, iCollection } from "./iCollection";
import { _iProduct, iProduct } from "./iProduct";
export type IElement = iCollection[] | iProduct[]
export type _IElement = _iCollection[] | _iProduct[]

interface base  {
    title: string,
}
export  interface iSwiper extends base  {
    elements: IElement,
} 

export interface _iSwiper extends base {
    elements: _IElement,
}