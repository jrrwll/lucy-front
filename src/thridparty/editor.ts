import {type Extension} from '@uiw/react-codemirror';

import { markdown } from '@codemirror/lang-markdown';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { sql } from '@codemirror/lang-sql';
import { python } from '@codemirror/lang-python';

export const EXTENSIONS: Extension[] = [
    javascript({ jsx: true }),
    markdown(),
    java(),
    sql(),
    python(),
];
