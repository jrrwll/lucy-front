export interface UnitItem {
    key: string
    name: string
    is_default: boolean
    convert: number | string
}

export interface MeasureItem {
    key: string
    name: string
    units: UnitItem[]
}

declare const data: MeasureItem[];
export default data;
