import { defineType, defineField } from "sanity"

export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: rule => [
                rule.required().max(80).error("Title must not be longer than 80 characters")
            ]
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
            validation: rule => [
                rule.required().error("You must specify a description")
            ]
        }),
        defineField({
            name: "image",
            title: "Product Image",
            type: "image",
    
        }),
        defineField({
            name: "banner",
            title: "Product Banner",
            type: "image",
            validation: rule => [
                rule.required().error("You must specify a banner")
            ]
        }),
        defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [
                {
                    name: "link",
                    type: "document",
                    title: "Link",
                    fields: [
                        {
                            title: "Link icon",
                            name: "icon",
                            type: "reference",
                            to: [{ type: "icon" }],
                        },
                        {
                            title: "Link",
                            name: "url",
                            type: "url",
                        },
                        {
                            title: "Name",
                            name: "name",
                            type: "string",
                        },
                    ]
                }
            ]
            
        }),
        
    ]
})