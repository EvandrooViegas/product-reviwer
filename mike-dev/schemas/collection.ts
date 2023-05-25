import { defineType, defineField } from "sanity"
import { TbLayoutGrid } from "react-icons/tb"
export default defineType({
    name: "collection",
    title: "Collection",
    type: "document",
    icon: TbLayoutGrid,
    fields: [
        defineField({
            name: "name",
            title: "Collection name",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Description of the collection",
            type: "string"
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image"
        }),
        defineField({
            name: "banner",
            title: "Banner",
            type: "image",
            validation: rule => [
                rule.required().error("A banner is required")
            ]
        }),

        defineField({
            name: "products",
            title: "Collection products",
            type: "array",
            of: [{
                name: "product",
                title: "Product",
                type: "reference",
                to: [{ type: "product" }]
            }],
            validation: rule => [
                rule.min(1).error("Collection must contain at least one product")
            ]
        }),
    ]
})