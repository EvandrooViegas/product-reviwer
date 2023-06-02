import { useLocation, useNavigate, Location } from "react-router-dom";
import { useState, useEffect } from "react";
type Props = {
  key: keyof Location;
  path: string;
};
type Pathname = "product" | "collection" | "home" | undefined;
export function useURL(props?: Props) {
  const { key, path } = props || {};
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(
    location && key
      ? location[key] === path || location[key]?.includes(path)
      : false
  );
  const setLocation = (value: string) => navigate(value);
  const pathname: Pathname = (() => {
    const path = location.pathname;
    const slicedPath = path.split("/")[1]; // slice off trailing slash
    if (slicedPath === "") return "home";
    else if (slicedPath === "product") return "product";
    else if (slicedPath === "collection") return "collection";
    return;
  })();
  useEffect(() => {
    if(!location || !key) return
    setIsActive(location[key] === path);
  }, [location]);
  return { isActive, setLocation, location, pathname };
}
