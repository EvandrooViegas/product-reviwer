import resolveConfig from "tailwindcss/resolveConfig"
import defaultTheme from "tailwindcss/defaultTheme.js"
import tailwindConfig from "../../tailwind.config.js"


const resolvedConfig = resolveConfig(tailwindConfig)
const extendedTheme = resolvedConfig.theme
export function useTailwind() {
    return { theme: {
        ...defaultTheme,
        ...extendedTheme
    } }
}