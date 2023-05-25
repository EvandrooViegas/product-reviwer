import { create } from "zustand"

type Store = {
    shouldDisplayNavbar: boolean;
    setShouldDisplayNavbar: (shouldDisplayNavbar: boolean) => void; 
    isBeingSnaped: boolean;
    setIsBeingSnaped: (isBeingSnaped: boolean) => void
}

export const useNavbar = create<Store>((set) => ({
    shouldDisplayNavbar: false, 
    setShouldDisplayNavbar: (shouldDisplayNavbar) => set({ shouldDisplayNavbar }),
    isBeingSnaped: false,
    setIsBeingSnaped: (isBeingSnaped: boolean) => set({ isBeingSnaped }),
    
})) 

