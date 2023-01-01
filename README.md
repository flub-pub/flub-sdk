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

## Deployment

Make sure you have `gh` installed globally. Ideally install it with your systems package manager (such as via `brew`). Otherwise you can install it via `npm install -g gh`.

Then follow these steps to publish a new version of the package to npm and create a new release on GitHub.

1. Build the package by running `npm run build`
2. Increment the release version in `package.json` using SEMVER (major, minor, patch)
3. Make sure you are logged into npm and have the correct permissions to publish the package.
4. When you're ready to publish, run `npm run release` to publish the package to npm.
5. Last, run `npm run release:git` to create and push a tag and then create a release.
