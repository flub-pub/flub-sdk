# flub-sdk

The client side SDK for utilizing the Flub API.

## Features

- [x] Convenient methods for interacting with Flub API
- [x] Cross-platform support (browser, node, react)

## Installation

Start by installing the package from npm:

```bash
npm install @flubpub/flub-sdk
```

## Development

In node you can use the package like so:

```typescript
import FlubSDK from '@bflubpub/flub-sdk'

const FlubClient = new FlubSDK.Client({
    baseUrl: 'http://127.0.0.1:8787'
})
```

In the browser you can include the file in a `<script>` tag but more ideally you can use a bundler like webpack to include the package.
