import { createClient } from "@sanity/client"

const projectId = process.env.SANITY_PROJECT_ID || "ofomfxmw"
const dataset = process.env.SANITY_DATASET || "production"
const token = process.env.SANITY_TOKEN || ""
export const sanity = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2021-10-21",
    useCdn: false,
})

