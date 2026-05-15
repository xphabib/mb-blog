---
title: A Small Dynamic Blog Without a Framework
date: 2026-05-14
excerpt: A minimal pattern for Markdown-driven pages.
---

You can add a post by creating a new `.md` file inside the `posts` folder.

Then add the filename to `posts/index.md`:

```md
- my-new-post.md
```

The HTML file will automatically load it and show it in the post list.

## Supported Markdown

This tiny renderer supports headings, paragraphs, bullet lists, links, images, inline code, bold text, italic text, and fenced code blocks.
