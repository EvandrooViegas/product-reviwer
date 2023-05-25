import { useLocation as useLocationRRD } from "react-router-dom"
type Location = "" | "product" | "collection"
export const useLocation = () => {
    const location = useLocationRRD()
    return {
        ...location,
        currentLocation: location.pathname.split("/")[1] as Location
    }
}