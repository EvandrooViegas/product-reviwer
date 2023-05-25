import {defineField, defineType} from 'sanity'
import { MdOutlineDiscount } from "react-icons/md"
export default defineType({
  name: 'cupom',
  title: 'Cupom',
  type: 'document',
  icon: MdOutlineDiscount,
  fields: [
    defineField({
      name: 'name',
      title: 'Cupom name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .error('Cupom name is requirde')
          .max(100)
          .error('Cupom name cannot be longer than 100 characters'),
    }),
    defineField({
      name: 'percentage',
      title: 'Cupom off percentage',
      type: 'number',
      validation: (rule) =>
        rule
          .required()
          .min(0)
          .error('Cupom off percentage must be between 0 and 100')
          .max(100)
          .error('Cupom off percentage must be between 0 and 100'),
    }),
  ],
})
