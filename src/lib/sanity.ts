import { createClient } from "@sanity/client"

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "ofomfxmw"
const dataset = import.meta.env.VITE_SANITY_DATASET || "production"
const token = import.meta.env.VITE_SANITY_TOKEN || ""
export const sanity = createClient({
    projectId: "ofomfxmw",
    dataset: "production",
    token: "skjhM5e82wi9KneXhQE3V8zmOGOxTL9nbwvYX33KlJfNjmvJmWKapPsE4lj3h251GWyWP860boVqtVFjkOBzEm2FSW1m4FbEdSn0qBCm51hlB2X8zyTN2dC23DWlxd4GSXWpSp7QlwRTfukgUtnoBcnCtnzl5WNHpEXyiDNranPD9Zm7R4ts",
    apiVersion: "2021-10-21",
    useCdn: false,
})

