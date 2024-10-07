import { TextType, getTextTypeClass, TextAlignment, getTextAlignmentClass } from '../../app/enum/Text'
import { cn } from "@/lib/utils"

type Prop = {
    text: String,
    type: TextType,
    alignment: TextAlignment,
    className?: string
}

export default function Text({
    text,
    type,
    alignment,
    className
}: Prop ) {
    return (
        <p className={cn(`text-lg ${getTextTypeClass(type)} ${getTextAlignmentClass(alignment)}`, className)}>
            {text}
        </p>
    )
}
