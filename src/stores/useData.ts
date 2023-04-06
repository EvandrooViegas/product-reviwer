import { create } from "zustand";
import iApp from "../types/iApp";
import getImageUrl from "../utils/get-image-url";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { SanityImageAssetDocument } from "@sanity/client";

interface iDBApp  {
    name: string, 
    avatar: SanityImageAssetDocument
}

type Store = {
    app: iApp | null,
    setApp: (app:iDBApp) => void, 
}
export const useData = create<Store>((set, get) => ({
    app: null,
    setApp: (app) => set((state) => ({
        ...state,
        app: {
            ...app,
            avatar: getImageUrl(app.avatar)
        }
    }))
}))

