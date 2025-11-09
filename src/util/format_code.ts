import type { Plugin } from 'prettier';
import prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserHtml from 'prettier/plugins/html';
import * as parserPostcss from 'prettier/plugins/postcss';
import * as parserYaml from 'prettier/plugins/yaml';
import * as parserTypescript from 'prettier/plugins/typescript';
import * as parserEstree from 'prettier/plugins/estree';
import { parse as parseJsonc } from 'jsonc-parser';
import javaPlugin from 'prettier-plugin-java'
import sqlPlugin from 'prettier-plugin-sql'

export const format_langs: string[] = [
    'javascript',
    'typescript',
    'json',
    'html',
    'css',
    'scss',
    'less',
    'xml',
    'yaml',
    // plugins
    'java',
    'sql',
]

const plugins: Array<string | URL | Plugin> = [
    parserBabel,
    parserHtml,
    parserPostcss,
    parserYaml,
    parserTypescript,
    parserEstree as Plugin,
    javaPlugin,
    sqlPlugin,
];

export async function fast_format_code(code: string, lang: string, indent: number = 4): Promise<string> {
    if (lang === "json") {
        const res = JSON.stringify(JSON.parse(code), null, indent);
        return Promise.resolve(res);
    }
    if (!format_langs.includes(lang)) {
        return Promise.reject(`Unsupported lang: ${lang}`);
    }
    if (lang === "xml") {
        lang = "html"
    } if (lang === "javascript") {
        lang = "babel"
    }
    return prettier.format(code, {
        parser: lang,
        plugins: plugins,
        tabWidth: indent,
    });
}

export const minify_langs: string[] = [
    'javascript',
    'css',
    'scss',
    'less',
    'html',
    'json'
];

export async function fast_minify_code(code: string, lang: string): Promise<string> {
    switch (lang) {
        case 'javascript':
            return (await import('terser')).minify(code).then(r => r.code || '');
        case 'css':
        case 'scss':
        case 'less':
            return (await import('csso')).minify(code).css;
        case 'html':
            return (await import('html-minifier-terser')).minify(code);
        case 'json':
            return JSON.stringify(parseJsonc(code));
        default:
            return Promise.reject(`Unsupported lang: ${lang}`);
    }
}
