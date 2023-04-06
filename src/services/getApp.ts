
import { sanity } from "../lib/sanity"
export default async function getApp() {
    const result = await sanity.fetch("*[_type == 'app'][0]")
    return result
}