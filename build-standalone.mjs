import { readFileSync, writeFileSync } from 'node:fs';

function build(src, out, width, height) {
  const raw = readFileSync(src, 'utf8');

  const helmet = raw.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
  let body = raw.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1];
  body = body.replace(/<helmet>[\s\S]*?<\/helmet>/, '').trim();

  // A single tall page: pin the page box AND the document box to the measured
  // content height, or Chrome spills a few sub-pixel rows onto a second page.
  const page = height
    ? `@page { size: ${width}px ${height}px; margin: 0; }
  html, body { width: ${width}px; height: ${height}px; overflow: hidden; }`
    : `@page { size: ${width}px auto; margin: 0; }`;

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Rayobyte — HTTP/3 Proxies</title>
${helmet}
<style>
  html, body { margin: 0; padding: 0; background: #FFFFFF; }
  ${page}
  @media print {
    html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
${body}
</body>
</html>`;

  writeFileSync(out, html, 'utf8');
  console.log(`wrote ${out}`);
}

const [, , src, out, width, height] = process.argv;
build(src, out, Number(width), height ? Number(height) : null);
