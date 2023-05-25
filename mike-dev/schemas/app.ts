import { defineType, defineField, validation } from "sanity"
import { GrDocumentConfig } from "react-icons/gr"
export default defineType({
    name: "app",
    title: "Application",
    type: "document",
    icon: GrDocumentConfig,
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
            name: "describer",
            title: "Describer",
            type: "document",
            fields: [
                defineField({
                    name: "title",
                    title: "Describer Title",
                    type: "string",
                    validation: rule => rule.required().error("A title for the describer must be specified")
                }),
                defineField({
                    name: "sentences",
                    title: "Describer sentences",
                    type: "array",
                    of: [{
                        name: "sentence",
                        title: "Sentence",
                        type: "string",
                        validation: rule => rule.required().error("You must specify a sentence for the describer")
                    }],
                    validation: rule => rule.custom(sentences => {
                        return sentences?.length! > 0 ? true : { message: 'You must specify at least one sentence'}
                    })
                })
            ]
        }),
        defineField({
            type: "document",
            name: "video",
            title: "Video",
            fields: [
                defineField({
                    name: "url",
                    title: "Video URL",
                    type: "url"
                }),
                defineField({
                    name: "title",
                    title: "Video Title",
                    type: "string",
                    validation: r => r.required()
                }),
                defineField({
                    name: "description",
                    title: "Video Description",
                    type: "text"
                })
            ]
        }),
        defineField({
            name: "socials",
            title: "Social Media links",
            type: "array",
            of: [{
                name: "social",
                title: "Social Media Link",
                type: "document",
                fields: [
                    defineField({
                        name: "icon",
                        title: "Social Media Icon",
                        type: "reference",
                        to: [{ type: "icon" }],
                        validation: rule => [
                            rule.required().error("You must specify a social media link for the application")
                        ]
                    }),
                    defineField({
                        name: "name",
                        title: "Social Media Name",
                        type: "string",
                        validation: rule => [
                            rule.required().error("You must specify a social media name")
                        ]
                    }),
                    defineField({
                        name: "link",
                        title: "Social Media Link",
                        type: "string",
                        validation: rule => [
                            rule.required().error("You must specify a social media link for the application")
                        ]
                    })
                ],
                preview: {
                    select: {
                        media: "icon.icon",
                        title: "name"
                    }
                }
            }],
        }),
        defineField({
            name: "swiper",
            title: "Swiper",
            type: "document",
            fields: [
                defineField({
                    name: "title",
                    title: "Swiper Title",
                    type: "string",
                    validation: r => r.required().error("You must specify a title for the swiper").min(5).max(50)
                }),
                defineField({
                    name: "elements",
                    title: "Swiper Elements",
                    type: "array",
                    of: [{
                        name: "element",
                        title: "Swiper Element",
                        type: "reference",
                        to: [{ type: "product" }, { type: "collection" }],
                    }],
                    validation: r => r.required().error("You must specify at least one element for the swiper"),
                })
            ]
        })
    ]
})