# panopto-captions-scraper

[![main.yml](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/main.yml)
[![formatter.yml](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/panopto-captions-scraper/actions/workflows/formatter.yml)

`panopto-captions-scraper` is an API-only web scraper for retrieving captions from a Panopto folder. It is used to populate [Examplify's](https://github.com/winstxnhdw/Examplify) vector database for essential educational content.

## Setup

Add your NUS-authorised Panopto cookie to the `.env` file. Minimally, the cookies required are `.ASPXAUTH`, `csrfToken` and `UserSettings`.

```bash
echo COOKIE=$COOKIE > .env
```

## Usage

The application will prompt you for the Panopto folder URL and will promptly scrape all video captions within the folder (non-recursively) in an ordered manner.

```bash
bun dev
```
