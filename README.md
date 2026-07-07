# TAKO Lab Website

This is the TAKO Lab website. It's built so that **anyone in the lab can update it
by editing simple text files** — no web-development experience needed. Most updates
are just editing a `.yaml` file (a plain list of entries) and dropping an image in a
folder.

If you can edit a text file, you can update this site. This guide walks you through
everything.

---

## The two ways to make an edit

**Option A — Edit on GitHub (easiest, nothing to install).**
Open the file on GitHub, click the ✏️ pencil, make your change, and click
**Commit changes**. The site rebuilds and goes live automatically in a couple of
minutes.

**Option B — Edit on your computer (for bigger changes / previewing first).**

```bash
npm install     # first time only
npm run dev     # live preview at http://localhost:4321 (updates as you type)
```

When you're done, commit and push to the `main` branch — the site redeploys itself.
(Optional: run `npm run format` before committing to keep files tidy.)

Requires [Node.js](https://nodejs.org) 18+ if editing locally.

---

## Where everything lives

| To change…                                 | Edit this file                   |
| ------------------------------------------ | -------------------------------- |
| **News** (home page)                       | `src/data/news.yaml`             |
| **Principal Investigator** card            | `src/data/director.yaml`         |
| **PhD Students**                           | `src/data/students.yaml`         |
| **Alumni**                                 | `src/data/alumni.yaml`           |
| **Publications**                           | `src/data/publications.yaml`     |
| **Talks**                                  | `src/data/talks.yaml`            |
| **"Joining the Lab" blurb**                | `src/pages/members.astro`        |
| Lab name, contact, PI links, menu bar tabs | `src/config.ts`                  |
| Colors & fonts                             | `tailwind.config.mjs`            |
| Images (logo, photos, slides…)             | the `public/` folder (see below) |

Everything under `src/data/` is a **list**: each item starts with `- ` and its
fields are indented below it. Copy an existing entry as a template when adding a new
one.

> ⚠️ **YAML tip:** indentation matters (use spaces, not tabs), and wrap text that
> contains a colon `:` or quotes in double quotes `"..."`. If the site fails to
> build, a broken YAML file is almost always the cause — check your latest edit.

---

## Updating each section

### 📰 News (`src/data/news.yaml`)

News is **sorted by date automatically** — add new items anywhere. The home page
shows the 6 most recent.

```yaml
- date: May 2025 # "Mon YYYY"
  tag: paper # optional colored label (see list below)
  text: 'Two papers accepted to ICML 2026!'
```

- **`tag`** shows a colored pill next to the date. Options:
  `paper` (coral), `funding` (green), `award` (amber), `talk` (blue),
  `team` (violet), `release` / `code` (gray). Any other word works too (shows gray).
- **`text`** can include links and simple formatting using HTML:
  ```yaml
  text: "Our paper <a href='https://arxiv.org/abs/2606.01509'>ProbMoE</a> was accepted! 🎉"
  ```
  (Use single quotes inside the double-quoted text. Add `target='_blank'` to open in
  a new tab.)

### 👥 Members

Three separate files feed the People page:

- **`src/data/students.yaml`** — one entry per student (`name`, `role`, `photo`,
  `url`, optional `interests`). Photos go in `public/people/`.
- **`src/data/alumni.yaml`** — text-only, shown in two columns:
  ```yaml
  - name: 'Alum Name'
    role: 'PhD 2024'
    now: 'now Researcher at Company' # where they are now (optional)
    url: '' # optional link on the name
  ```
- The **"Joining the Lab"** recruiting text is written directly in
  `src/pages/members.astro` (edit the paragraphs inside the `<aside>` block).

### 📄 Publications (`src/data/publications.yaml`)

**Sorted newest-first by `year` automatically.**

```yaml
- title: 'SIMPLE: A Gradient Estimator for k-Subset Sampling'
  authors: 'Kareem Ahmed, Zhe Zeng, Mathias Niepert, Guy Van den Broeck'
  venue: 'International Conference on Learning Representations (ICLR)'
  year: 2023
  url: 'https://arxiv.org/abs/2210.01941' # links the title
  award: 'Oral presentation, acceptance rate 4.1%' # optional coral highlight
  pdf: 'https://arxiv.org/pdf/2210.01941' # buttons: pdf, poster, slides, video, code
  bibtex: | # shown behind a "BibTeX" button + Copy
    @inproceedings{ahmed2023simple,
      title  = {SIMPLE: A Gradient Estimator for k-Subset Sampling},
      author = {Ahmed, Kareem and Zeng, Zhe and Niepert, Mathias and Van den Broeck, Guy},
      year   = {2023}
    }
```

- Resource buttons appear only when you fill them in: **`pdf`, `poster`, `slides`,
  `video`, `code`**. Each is a URL, or a `/…` path to a file in `public/`.
- **`award`** shows as a coral highlight below the venue.
- **`bibtex`** uses a `|` block — keep every line indented underneath it.

### 🎤 Talks (`src/data/talks.yaml`)

**Sorted newest-first by `date` automatically.** Thumbnails are generated for you.

```yaml
- title: 'Constraining Deep Generative Models with a Neurosymbolic Approach'
  label: 'Invited Talk' # badge at top of the card
  date: 'Oct 2025'
  location: 'AI/ML Seminar at UVA'
  locationUrl: '' # optional link on the location
  slides: '/talks/slides/aiml25-slides.pdf' # a PDF in public/talks/slides/
  video: '' # a YouTube or Vimeo URL
```

- **Thumbnail is automatic:** the first page of the `slides` PDF is used; if there
  are no slides, the `video` thumbnail (YouTube/Vimeo) is used; otherwise no image.
  You normally never set a thumbnail yourself.
- Put slide PDFs in `public/talks/slides/` and (optional) posters in
  `public/talks/posters/`.

### 🏷️ Site settings (`src/config.ts`)

Lab name, PI name/link, contact address, email, social links, and the **menu bar
tabs** are all here. Well-commented — just change the text in quotes.

### 🎨 Colors & fonts (`tailwind.config.mjs`)

The brand colors live here: `accent` (coral), `primary` (navy), `bar` (gold menu
bar), `cream`. Change a hex value to re-theme the whole site.

---

## Images — where to put them

Everything in the **`public/`** folder is served as-is. Reference a file by its path
after `public` (e.g. a file at `public/people/zhe.jpg` is used as `zhe.jpg` in
`director.yaml`).

| Image              | Put it in               | Referenced by                 |
| ------------------ | ----------------------- | ----------------------------- |
| Member / PI photos | `public/people/`        | `photo:` in members files     |
| Talk slides (PDF)  | `public/talks/slides/`  | `slides:` in `talks.yaml`     |
| Talk posters       | `public/talks/posters/` | `poster:` (publications) etc. |
| Lab logo           | `public/logo.png`       | shown on the home page        |
| Browser-tab icon   | `public/icon.png`       | the favicon                   |

---

## Quick recipes

**Add a paper:** copy the top entry in `publications.yaml`, change the fields. Done —
it sorts into the right place by `year`.

**Add a talk:** copy an entry in `talks.yaml`, drop the slide PDF in
`public/talks/slides/`, point `slides:` at it. The thumbnail appears automatically.

**Post news:** add an item to the top of `news.yaml` with a `date`, a `tag`, and
`text`. It sorts by date on its own.

**Add a student:** add an entry to `students.yaml` and put their photo in
`public/people/`.

---

## Publishing

**It's automatic.** Every change committed to the `main` branch triggers a build and
deploys to GitHub Pages within a couple of minutes (via
`.github/workflows/deploy.yml`). There's nothing to run by hand.

If a change doesn't appear, check the **Actions** tab on GitHub for a red ❌ — that
almost always means a YAML formatting mistake in the file you just edited.

---

## Under the hood (for the curious)

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Content lives in `src/data/*.yaml`; each page in `src/pages/` reads a file and
renders it with a component from `src/components/`. Talk thumbnails are generated by
`scripts/gen-thumbnails.mjs` automatically during dev and build. You don't need to
touch any of this for normal updates.
