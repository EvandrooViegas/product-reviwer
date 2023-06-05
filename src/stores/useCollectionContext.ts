import { create } from "zustand"
import { iCollection } from "../types"

type Store = {
    collectionContext: iCollection | null
    setCollectionContext: (collectionContext: iCollection) => void
}
export const useCollectionContext = create<Store>((set) => ({
    collectionContext: null,
    setCollectionContext: (collectionContext: iCollection) => set({ collectionContext })   
}))

