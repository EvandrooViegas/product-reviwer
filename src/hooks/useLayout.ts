import { useViewportSize } from "@mantine/hooks";
import { layoutConfig } from "../../config";
import useWindowRole from "./useWindowRole";

export default function useLayout() {
  const windowSize = useViewportSize();
  const { role } = useWindowRole();
  return {
    ...windowSize,
    width:
      role === "sm"
        ? windowSize.width * layoutConfig.smScreensMaxWidthPercentage
        : windowSize.width * layoutConfig.lgScreensMaxWidthPercentage,
  };
}
