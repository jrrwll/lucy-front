export interface ToolItem {
    value: string
    label: string
}

export interface CategoryItem {
    value: string
    label: string
    tools: ToolItem[]
}

declare const data: CategoryItem[];
export default data;
