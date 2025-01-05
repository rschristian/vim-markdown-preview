<h1 align="center">vim-markdown-preview</h1>

<div align="center">
    <a href="https://github.com/rschristian/vim-markdown-preview/blob/master/LICENSE">
        <img
            alt="NPM"
            src="https://img.shields.io/badge/license-MIT-brightgreen"
        />
    </a>
</div>

<br />

Provides a quick and light method of previewing markdown files locally in your browser.

> **Important**: Still under development! Lot of styling work to do yet.

## Installation

> Make sure you have node support for neovim.
> Run the command `npm install -g neovim` to add it.

Use your favorite plugin manager to install the plugin.
I use [vim-plug](https://github.com/junegunn/vim-plug).

```vim
Plug('rschristian/vim-markdown-preview', {['do'] = 'npm install --omit=dev'})
```

After installing the plugin, run `:UpdateRemotePlugins` to register it with Neovim.

## Usage

To preview a markdown file, run the command `:MarkdownPreview` while in normal mode.

## Alternatives

Other options for you to checkout if this does not work for you:

-   [iamcco/markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim)

## License

MIT © Ryan Christian
