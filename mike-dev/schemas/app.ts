import { defineType, defineField } from "sanity"
export default defineType({
    name: "app",
    title: "Application",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "App name",
            type: "string",
            validation: rule => [
                rule.required().error("You must specify a name for the application")
            ]
        }),
        defineField({
            name: "avatar",
            title: "Your avatar",
            type: "image",
            validation: rule => [
                rule.required().error("You must specify a avatar for the application")
            ]
        }),
        defineField({
            name: "video",
            title: "Youtube Video URL",
            type: "url"
        })
    ]
})