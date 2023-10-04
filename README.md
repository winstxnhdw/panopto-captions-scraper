# panopto-captions-crawler

`panopto-captions-crawler` scrapes captions from a Panopto folder and saves them locally.

## Commands

### Setup

Add your NUS-authorised Panopto cookie to the `.env` file.

```bash
echo COOKIE=$COOKIE > .env
```

Install all dependencies.

```bash
bun install
```

Run your application.

```bash
bun dev
```

### Build

Minify and bundle the Node application with [esbuild](https://esbuild.github.io/).

```bash
bun run build
```

Human-readable bundle of your Node application. For debugging purposes.

```bash
bun run build -t
```

### Test

Run your tests with hot reloading.

```bash
bun run test
```

Run your tests without hot reloading. For testing in a CI pipeline.

```bash
bun test
```
