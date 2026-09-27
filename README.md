# rahul-shah.com.np

Personal site. Astro, plain CSS, Markdown. Hosted on Cloudflare Workers as static files.

Fonts are self-hosted and open (Source Serif 4, Geist, Geist Mono; licenses in `src/assets/fonts/`). Icons come from `@phosphor-icons/core`.

```sh
npm install
npm run dev       # http://localhost:4321, drafts visible
npm run build     # static site in dist/
npm run check     # type-check
npm run deploy    # build and publish to Cloudflare (needs `npx wrangler login` once)
```

## Editing

| What | Where |
|---|---|
| Name, intro, links, work, projects, education | `src/site.ts` |
| Posts | `src/content/notes/*.md` |
| Colors, type, spacing | `src/styles/global.css` |
| Hand-drawn illustrations | `src/sketches.ts` (paths on a 200x200 canvas) |
| Hero rotation (portrait, then drawings) | `src/components/HeroArt.astro` |
| Profile photo | `src/assets/profile.jpg` |
| Logo | `src/components/Logo.astro` (also `public/favicon.svg`) |

A new post is a new Markdown file. `src/content/notes/how-to-write-a-post.md` is a draft template: copy it, rename it, set `draft: false`. The file name is the URL (`my-note.md` becomes `/notes/my-note/`). Posts also go out on `/rss.xml`.

## Hosting

`wrangler.jsonc` serves `dist/` on `rahul-shah.com.np` and `www.rahul-shah.com.np`. DNS for the domain is on Cloudflare.

To deploy on every push instead of running `npm run deploy`, connect this repo in the Cloudflare dashboard under Workers & Pages > Create > Import a repository, with build command `npm run build` and deploy command `npx wrangler deploy`.

## Subdomains

Anything can live at `<name>.rahul-shah.com.np`. Add the DNS record in the Cloudflare dashboard, or attach the subdomain from the project itself:

- Another static site or Worker: add `{ "pattern": "<name>.rahul-shah.com.np", "custom_domain": true }` to that project's `routes`.
- Something hosted elsewhere (Vercel, a VPS): add a `CNAME` or `A` record pointing at it.

## Exposing a local service

Cloudflare Tunnel publishes a port on this machine (or a home server) at a subdomain, with no router port forwarding and no public IP.

```sh
brew install cloudflared
cloudflared tunnel login
cloudflared tunnel create home
cloudflared tunnel route dns home app.rahul-shah.com.np
cloudflared tunnel run --url http://localhost:3000 home
```

To keep it private, put the hostname behind Cloudflare Access (Zero Trust > Access > Applications) so only your email can sign in. To run the tunnel permanently, install it as a service with `sudo cloudflared service install`.
