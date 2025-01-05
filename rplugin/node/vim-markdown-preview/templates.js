export const templateHtml = ({ bufferName, bufferContent }) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <title>${bufferName}</title>

        <style>${css}</style>
    </head>
    <body>
        <main>
            ${bufferContent}
        </main>
    </body>
</html>
`;

const css = `
body {
  color: #f0f0f0;
  background-color: #0d1117;
  font-size: 1.125rem;

  margin: 0;
  padding: 0;
  min-height: 100vh;
}

main {
  max-width: 56rem;
  margin: 0 auto 4rem;

}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h1, h2 {
  padding-bottom: .3em;
  border-bottom: 1px solid #3d444db3;
}

a {
  color: #4493f8;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

blockquote {
  padding: 0 1em;
  color: #9198a1;
  border-left: 0.25em solid #3d444d;
}

code {
  padding: 0.1em 0.2em;
  background-color: #656c7633;
  border-radius: 0.5rem;

  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}

pre {
  padding: 0.75rem;
  overflow-x: scroll;
  background-color: #151b23;
  border-radius: 0.5rem;

  code {
    padding: 0;
    background-color: transparent;
  }
}

/** Prism Code Highlighting **/

.token.inserted {
  color: #aff5b4;
  background-color: #033a16;
}

.token.deleted {
  color: #ffdcd7;
  background-color: #67060c;
}
`;
