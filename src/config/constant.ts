
export const MINIFY_LANGS: string[] = [
    "html",
    "css",
    "javascript",
    "json",
    "xml",
    "sql",
];


export async function prettier_code(
    content: string,
    lang: string,
    indent: number = 4,
    minify: boolean = false
): Promise<string> {
    if (lang === "json") {
        if (minify) {
            return JSON.stringify(JSON.parse(content));
        } else {
            return JSON.stringify(JSON.parse(content), null, indent);
        }
    }
    return Promise.reject("not support");
}
