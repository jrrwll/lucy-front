import { type Monaco, type OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";

/*
<MonacoEditor key={language} language={language} .../>
*/
// https://shiki.style/languages, suck as groovy
// https://shiki.style/themes, such as one-dark-pro
export function createHighlighterOnMount(
    lang: string, theme: string = "github-light",
    onMount?: (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => void
): OnMount {
    return async (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        if (onMount) onMount(editor, monaco);

        const highlighter = await createHighlighter({
            themes: [theme],
            langs: [lang],
        });

        monaco.languages.register({ id: lang });

        shikiToMonaco(highlighter, monaco);

        monaco.editor.setTheme(theme);
    };
}
