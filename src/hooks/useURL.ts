import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
type Props = {
  hash: string;
};
export function useURL(props: Props) {
  const { hash } = props;
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.hash === hash);

  const setLocation = (value: string) => (window.location.hash = value);
useEffect(() => {
    setIsActive(location.hash === hash)
}, [location.hash])
  return { isActive, setLocation, location };
}
