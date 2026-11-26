# TURKEY4SHELL (`CVE-2026-1126`)

A zero-dependency static parody cybersecurity advisory website for **Turkey4Shell** — Critical Zero-Day Remote Couch Execution (RCE) via untrusted gravy interpolation in `Turkey4j`.

## Repository Layout

```text
├── public/                 # Static assets deployed to Cloudflare
│   ├── index.html          # Main advisory page + inline pixel SVGs
│   ├── styles.css          # Dark tactical terminal grid & CRT theme
│   ├── app.js              # Payload switcher, PoC terminal, Uncle Scanner, SHA-256 & STUFFCON-1
│   ├── favicon.svg         # Pixel-art Turkey + Skull favicon
│   └── _headers            # Security & cache-control headers
├── .gitignore
├── README.md
└── LICENSE
```

## Local Preview

```bash
python3 -m http.server 8765 --directory public
```

Then open [http://localhost:8765/](http://localhost:8765/).

## Deploy to Cloudflare Workers

1. Push this repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Compute & AI → Workers & Pages → Create → Import a repository**.
3. Select this repository and set:
   - **Build command:** *(leave empty)*
   - **Assets directory / Deploy directory:** `public`
4. Click **Save and Deploy**. Cloudflare automatically serves `public/` at the edge and applies `public/_headers`.
