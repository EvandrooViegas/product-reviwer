import { create } from "zustand";
import { iApp } from "../types/index";
import getImageUrl from "../utils/get-image-url";
import { SanityImageAssetDocument } from "@sanity/client";



type Store = {
    app: iApp | null,
    setApp: (app:iApp) => void, 
}
export const useData = create<Store>((set, get) => ({
    app: null,
    setApp: (nApp:iApp) => set((state) => ({
        ...state,
        app: nApp
    }))
}))

