import { defineType, defineField } from "sanity"
import { BiDevices } from "react-icons/bi"
import { Icon } from "@iconify/react"
export default defineType({
    name: "app",
    title: "Application",
    type: "document",
    icon: BiDevices,
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
            type: "reference",
            name: "video",
            title: "Video",
            to: [{ type: "video" }],
        }),
        defineField({
            name: "describer",
            title: "Describer",
            type: "reference",
            to: [{ type: "describer" }],
            validation: rule => rule.required().error("You must specify a describer for the application")
        }),
        defineField({
            name: "socials",
            title: "Social Media links",
            type: "array",
            of: [{
                name: "social",
                title: "Social Media Link",
                type: "reference",
                to: [{ type: "link" }],
                preview: {
                    select: {
                        media: "icon.icon",
                        title: "name"
                    },
                    prepare(context) {
                        return {
                            ...context,
                            media: <Icon icon={context.media} />
                        }

                    }
                }
            }],
        }),
        defineField({
            name: "swiper",
            title: "Swiper",
            type: "reference",
            to: [{ type: "swiper" }],
        })
    ]
})