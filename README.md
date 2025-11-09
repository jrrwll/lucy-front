## How I start the project

```shell
pnpm create vite --template react-ts --no-rolldown --no-interactive .
pnpm i -D rollup-plugin-visualizer

pnpm i react-router-dom zustand

pnpm i antd
```

**Tools**

```shell
# highlight editor
pnpm i @uiw/react-codemirror highlight.js
pnpm i @codemirror/lang-markdown @codemirror/lang-java @codemirror/lang-javascript @codemirror/lang-sql @codemirror/lang-python

# convert code
pnpm i js-yaml @iarna/toml xml-js
pnpm i -D @types/js-yaml

# format code
pnpm i prettier prettier-plugin-java prettier-plugin-sql
# minify code
pnpm i csso jsonc-parser
pnpm i -D @types/csso
```
