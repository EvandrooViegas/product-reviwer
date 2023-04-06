import { defineType, defineField } from "sanity"

export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string"
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