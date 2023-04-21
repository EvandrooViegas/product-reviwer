import { useViewportSize } from "@mantine/hooks";

export default function useWindowRole():{
    role: "sm" | "md" | "lg" | "xl" | "2xl"
} {
    const { height, width } = useViewportSize();
    const role = function(){
        if(width <= 640) return "sm"
        else if(width > 640 && width <= 768) return "md"
        else if(width > 768 && width <= 1024) return "lg"
        else if(width > 1024 && width <= 1280) return "xl"
        else return "2xl"
    }()
    return { role }
}