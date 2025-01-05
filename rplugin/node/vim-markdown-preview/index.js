import os from 'node:os';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import childProcess from 'node:child_process';

import { marked } from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

import { templateHtml } from './templates.js';

marked.use({
    renderer: {
        code({ text, lang }) {
            if (!lang) return `<pre><code>${text}</code></pre>`;
            if (!Prism.languages[lang]) loadLanguages([lang]);

            const highlight = Prism.highlight(text, Prism.languages[lang], lang);
            return `<pre class="highlight"><code class="language-${lang}">${highlight}</code></pre>`;
        },
    },
});

/**
 * @param {import('neovim').NvimPlugin} plugin
 */
async function run(plugin) {
    const buffer = await plugin.nvim.buffer;
    const bufferLines = await buffer.getLines();
    const bufferContent = bufferLines.join('\n');
    const bufferName = await buffer.name;

    const html = await marked(bufferContent);

    const tempFile = path.join(os.tmpdir(), 'rschristian--vim-markdown-preview.html');
    await fs.writeFile(tempFile, templateHtml({ bufferName, bufferContent: html }));

    return childProcess.spawn('xdg-open', [tempFile]);
}

/**
 * @param {import('neovim').NvimPlugin} plugin
 */
export default function Plugin(plugin) {
    plugin.setOptions({ dev: false });

    plugin.registerCommand('MarkdownPreview', async () => await run(plugin));
}
