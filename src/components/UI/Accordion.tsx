import { Accordion as AccordionComp } from "@mantine/core";

type Props = {
  children: React.ReactNode
} & React.ComponentProps<typeof AccordionComp>

export  function Accordion(props: Props) {
  const { children } = props
  return (
    <AccordionComp {...props}>
        {children}
    </AccordionComp>
  )
}

export function AccordionItem(props:{
  accordionItemProps?: React.ComponentProps<typeof AccordionComp.Item>,
  accordionControlProps?: React.ComponentProps<typeof AccordionComp.Control>,
  accordionPanelProps?: React.ComponentProps<typeof AccordionComp.Panel>,
  title: string,
  value: string,
  children: React.ReactNode
}) {
  const { 
    title, 
    value, 
    children, 
    accordionItemProps, 
    accordionControlProps, 
    accordionPanelProps 
  } = props
  return (
    <AccordionComp.Item {...accordionItemProps} value={value}>
      <AccordionComp.Control {...accordionControlProps}>
        <p className="font-semibold">{title}</p>
      </AccordionComp.Control>
      <AccordionComp.Panel {...accordionPanelProps}>
        {children}
      </AccordionComp.Panel>
    </AccordionComp.Item>
  )
}