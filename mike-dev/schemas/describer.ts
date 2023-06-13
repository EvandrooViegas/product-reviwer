import { defineField, defineType } from "sanity"
import { BsPersonVcard } from "react-icons/bs"
export default defineType({
    name: "describer",
    title: "Describer",
    type: "document",
    icon: BsPersonVcard,
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
})