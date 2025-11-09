import hljs from 'highlight.js';

export function detect_lang(code: string): Promise<string> {
    const res = hljs.highlightAuto(code, [
        'javascript', 'python', 'java', 'xml', 'json',
        'sql', 'html', 'css', 'bash', 'c', 'cpp', 'csharp',
        'go', 'kotlin', 'lua', 'markdown', 'php', 'ruby',
        'rust', 'scala', 'swift', 'typescript', 'yaml'
    ]);
    let lang = res.language || 'plaintext';
    if (lang === 'pgsql') {
        lang = 'sql';
    }
    return Promise.resolve(lang);
}
