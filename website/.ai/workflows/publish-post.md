# Publish a post

Use when adding or editing a blog post (a Journal entry). Follow [content rules](../rules/content.md).

1. **Create the file.** `src/content/posts/<kebab-slug>.md` with frontmatter:

   ```markdown
   ---
   title: A title
   slug: a-title
   date: 2026-11-14
   summary: One or two sentences, shown on cards, the map and the spine teaser.
   tags: [architecture, aws]
   cover: /assets/art/server-hall.webp
   draft: true
   ---
   ```

2. **Write the body.** Use GitHub-flavoured markdown and start sections at `##`. Code fences, tables, blockquotes and lists are styled by `.prose`.
3. **Cover art.** Reuse an existing plate or add a WebP to `public/assets/art/` (about 1280px wide, about 200 KB or less).
4. **Check it renders.** With `npm start` (the journal plugin recompiles and reloads on save), open `/blog/<slug>`. Confirm the title, cover, metadata sheet, related posts, the counter ("Entry N of M" beside the Journal spread), search and the tag filter on `/blog`, and that the newest three entries show on the map.
5. **Publish.** Set `draft: false` (or remove the key) only once the author has approved the text. Run `npm run lint` and `npm run build`.
