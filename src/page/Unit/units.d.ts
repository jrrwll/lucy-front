export interface UnitItem {
    value: string
    label: string
    pinyin?: string
    is_default?: boolean
    convert?: number | string
    convert_from?: string
    convert_to?: string
}

export interface MeasureItem {
    value: string
    label: string
    units: UnitItem[]
}

declare const data: MeasureItem[];
export default data;
