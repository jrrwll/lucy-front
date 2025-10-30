
export function format_code(content: string, lang: string): string {
    switch (lang) {
        case "json":
            return JSON.stringify(JSON.parse(content), null, 4);
        default:
            throw new Error(`Unsupported lang to format: ${lang}`);
    }
}
