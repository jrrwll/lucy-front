import { fast_format_code, fast_minify_code, format_langs, minify_langs } from '@/util/format_code.ts'

const base_url = "/api";

export async function format_code(
    code: string,
    lang: string,
    indent?: number
): Promise<string> {
    if (format_langs.includes(lang)) {
        return fast_format_code(code, lang, indent);
    }

    let url = `${base_url}/code/format?lang=${lang}`;
    if (indent != null) url += `&indent=${indent}`;
    const res = await fetch(url, {
        method: "POST",
        body: code,
    });
    return res.text();
}

export async function minify_code(code: string, lang: string): Promise<string> {
    if (minify_langs.includes(lang)) {
        return fast_minify_code(code, lang);
    }

    const res = await fetch(`${base_url}/code/minify?lang=${lang}`, {
        method: "POST",
        body: code,
    });
    return res.text();
}
