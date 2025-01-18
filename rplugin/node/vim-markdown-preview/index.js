import os from 'node:os';
import url from 'node:url';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import childProcess from 'node:child_process';

import { marked } from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let readTemplateHtml;

marked.use({
    renderer: {
        code({ text, lang }) {
            if (lang) {
                if (lang == 'jsonc') lang = 'json5';
                if (lang == 'js' && text.includes('<')) lang = 'jsx';

                if (!Prism.languages[lang]) loadLanguages([lang]);
                text = Prism.highlight(text, Prism.languages[lang], lang);
            }

            return `<pre class="highlight"><code class="${lang ? 'language-' + lang : ''}">${text}</code></pre>`;
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

    if (!bufferName.endsWith('.md')) {
        return plugin.nvim.errWriteLine('This is not a markdown file');
    }

    if (!readTemplateHtml) {
        readTemplateHtml = fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    }

    const [templateHtml, htmlified] = await Promise.all([readTemplateHtml, marked(bufferContent)]);

    const constructedTemplate = templateHtml
        .replace('<% bufferName %>', bufferName)
        .replace('<% bufferContent %>', htmlified);

    const tempFile = path.join(os.tmpdir(), 'rschristian--vim-markdown-preview.html');
    await fs.writeFile(tempFile, constructedTemplate);

    return childProcess.spawn('xdg-open', [tempFile]);
}

/**
 * @param {import('neovim').NvimPlugin} plugin
 */
export default function Plugin(plugin) {
    plugin.setOptions({ dev: false });

    plugin.registerCommand('MarkdownPreview', async () => await run(plugin));
}
