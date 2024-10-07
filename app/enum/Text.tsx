// text font size

export enum TextType {
    Normal,
    Bold,
    Black,
    Light
}

export function getTextTypeClass(type: TextType){
    switch(type) {
        case TextType.Normal:
            return 'font-normal'
        case TextType.Bold:
            return 'font-bold'
        case TextType.Black:
            return 'font-black'
        case TextType.Light:
            return 'font-thin'
    }
}

// text alignment

export enum TextAlignment {
    Left,
    Center,
    Right
}

export function getTextAlignmentClass(align: TextAlignment){
    switch(align) {
        case TextAlignment.Left:
            return 'text-left'
        case TextAlignment.Center:
            return 'text-center'
        case TextAlignment.Right:
            return 'text-right'
    }
}