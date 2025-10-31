const base_url = "/api";

export async function format_code(
    code: string,
    lang: string,
    ident?: number
): Promise<string> {
    if (lang === "json") {
        const res = JSON.stringify(JSON.parse(code), null, ident ? ident : 4);
        return Promise.resolve(res);
    }

    let url = `${base_url}/code/format?lang=${lang}`;
    if (ident != null) url += `&ident=${ident}`;
    const res = await fetch(url, {
        method: "POST",
        body: code,
    });
    return res.text();
}

export async function minify_code(code: string, lang: string): Promise<string> {
    if (lang === "json") {
        return Promise.resolve(JSON.stringify(JSON.parse(code)));
    }

    const res = await fetch(`${base_url}/code/minify?lang=${lang}`, {
        method: "POST",
        body: code,
    });
    return res.text();
}
