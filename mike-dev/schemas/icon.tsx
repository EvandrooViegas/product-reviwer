import { defineType } from "sanity";
import { Icon } from '@iconify/react';
import { BiCategoryAlt } from "react-icons/bi" 
export default defineType({
    name: "icon",
    title: "Icon",
    type: "document",
    icon: BiCategoryAlt,
    fields: [
        {
            name: "icon",
            title: "Icon Path - https://icon-sets.iconify.design/",
            type: "string"
        },
        {
            name: "name",
            title: "Name",
            type: "string"
        }
    ],
    preview: {
        select: {
            media: "icon",
            title: "name",
        },
        prepare(ctx) {
            return {
                ...ctx,
                media: <Icon icon={ctx.media} />
            }
        },
    }
})