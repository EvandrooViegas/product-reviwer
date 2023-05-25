import { createClient } from "@sanity/client"

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID 
const dataset = import.meta.env.VITE_SANITY_DATASET 
const token = import.meta.env.VITE_SANITY_TOKEN 
export const sanity = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2021-10-21",
    useCdn: false,
})

