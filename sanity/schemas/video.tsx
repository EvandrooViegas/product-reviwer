import { defineField, defineType } from "sanity"
import {  BsCameraVideo} from "react-icons/bs"
export default defineType({
    type: "document",
    name: "video",
    title: "Video",
    icon: BsCameraVideo,
    fields: [
        defineField({
            name: "url",
            title: "Video URL",
            type: "url",
            validation: r => r.required()
        }),
        defineField({
            name: "title",
            title: "Video Title",
            type: "string",
            validation: r => r.max(40)
        }),
        defineField({
            name: "description",
            title: "Video Description",
            type: "text"
        })
    ]
})