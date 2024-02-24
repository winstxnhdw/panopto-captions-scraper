# panopto-captions-scraper

[![main.yml](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/main.yml)
[![formatter.yml](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/formatter.yml)

`panopto-captions-scraper` is an API-only web scraper for retrieving captions from a Panopto folder. It is used to populate [Examplify's](https://github.com/winstxnhdw/Examplify) vector database for essential educational content. All video captions are scraped within the folder (non-recursively) in an ordered manner.

## Usage

Download `PanoptoScraper` from the [releases](https://github.com/winstxnhdw/panopto-captions-scraper/releases/tag/latest) page and set the `COOKIE` environment variable to your NUS-authorised Panopto cookie. Minimally, the only cookie required is `.ASPXAUTH`.

```bash
export COOKIE='.ASPXAUTH=CE423DEAF34ASDASD234NSLKNKJABSD234'
```

Run the scraper and the program will prompt you for the Panopto folder URL.

```bash
./PanoptoScraper
```

## Development

Add your NUS-authorised Panopto cookie to the `.env` file.

```bash
echo COOKIE=$COOKIE > .env
```

Install the dependencies.

```bash
bun install
```

Run the application.

```bash
bun dev
```
