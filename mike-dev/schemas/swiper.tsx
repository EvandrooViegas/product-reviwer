import { defineField, defineType } from "sanity";
import { MdOutlineSwipeRightAlt } from "react-icons/md"
export default defineType({
    type: "document",
    name: "swiper",
    title: "Swiper",
    icon: MdOutlineSwipeRightAlt,
    fields: [
        defineField({
            name: "title",
            title: "Swiper Title",
            type: "string",
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
        })
    ]
})