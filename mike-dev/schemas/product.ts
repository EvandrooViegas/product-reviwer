import { defineType, defineField } from "sanity"
import { TbSquareRounded } from "react-icons/tb"
export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    icon: TbSquareRounded,
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
            name: "cupom",
            title: "Cupom",
            type: "reference",
            to: [{ type: "cupom" }]
            
        }),
        defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{ 
                name: "link",
                title: "Link",
                type: "reference",
                to: [{ type: "link" }],
                
             }],
          
        }),
    ],
    preview: {
        select: {
            title: "name",
            banner: "banner",
            image: "image"
        },
        prepare({ title, banner, image }) {
            return {
                title,
                media: banner || image,
            }
        }
    }
})