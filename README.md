# kbjiang.github.io

Personal data science blog, built with [Quartz 5](https://quartz.jzhao.xyz) and deployed to
GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

## Writing

Posts are plain Obsidian notes. Point your Obsidian vault at the `content/` folder, then
write in `content/posts/`. Obsidian syntax is rendered natively:

- image embeds — `![[cnn-im2col.png]]` and `![[cnn-toeplitz.png|500]]` (the `|500` sets pixel width)
- LaTeX — `$inline$` and `$$display$$`, via KaTeX

`$$` block delimiters must sit on their own lines; `$$ \begin{align*}` on a shared line
will not render.

Attachments belong in `content/assets/images/`. Set Obsidian's default attachment folder
there so embeds resolve both locally and on the site.

Frontmatter:

```yaml
---
title: "Implementation: CNN from scratch"
date: 2026-04-05
tags:
  - implementation
  - CNN
---
```

Quartz has no `categories` taxonomy — the old Jekyll categories were folded into `tags`.

## Local development

```bash
npm install
npx quartz build --serve   # http://localhost:8080
```
