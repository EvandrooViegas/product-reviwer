import { defineType } from "sanity";
import { BsLink45Deg } from "react-icons/bs"
import { Icon } from '@iconify/react';


export default defineType({
    name: "link",
    type: "document",
    title: "Link",
    icon: BsLink45Deg, 
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
        
    ],
    preview: {
        select: {
            media: "icon.icon",
            title: "name"
        },
        prepare(ctx) {
            console.log(ctx)
            return {
                ...ctx,
                media: <Icon icon={ctx.media }/>
            }
        },

    }
})