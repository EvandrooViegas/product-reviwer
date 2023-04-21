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
            name: "video",
            title: "Youtube Video URL",
            type: "url"
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
                ]
            }]
        }),
    ]
})