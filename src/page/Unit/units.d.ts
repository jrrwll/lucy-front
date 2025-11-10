export interface UnitItem {
    key: string
    label: string
    pinyin?: string
    is_default?: boolean
    convert: number | string
}

export interface MeasureItem {
    key: string
    label: string
    units: UnitItem[]
}

declare const data: MeasureItem[];
export default data;
