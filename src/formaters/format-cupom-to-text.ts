import { iCupom } from "../types/iCupom"

type IFormatCupomToText = {
    cupom: iCupom
}
export default function formatCupomToText({ cupom }:IFormatCupomToText) {
    if(!cupom) return ""
    return `use ${cupom.name} para ${cupom.percentage}% de desconto`
}