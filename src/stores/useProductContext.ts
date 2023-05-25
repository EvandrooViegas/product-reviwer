import { create } from "zustand"
import { iProduct } from "../types"

type Store = {
    productContext: iProduct | null
    setProductContext: (productContext: iProduct) => void
}
export const useProductContext = create<Store>((set) => ({
    productContext: null,
    setProductContext: (productContext: iProduct) => set({ productContext })   
}))

