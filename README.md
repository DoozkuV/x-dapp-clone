# Solana Twitter

A decentralized Twitter-like application built on Solana using the Anchor framework.

## Overview

This program allows users to send tweets on the Solana blockchain. Each tweet contains:
- Author (Solana public key)
- Timestamp
- Topic (max 50 characters)
- Content (max 280 characters)

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://www.anchor-lang.com/docs/installation)
- [Node.js & Yarn](https://yarnpkg.com/getting-started/install)

## Installation

```bash
yarn install
```

## Build

```bash
anchor build
```

## Test

```bash
anchor test
```

## Deploy

```bash
anchor deploy
```

## Program ID

```
HQJ99aFb3TrTe2dsF6wevCRaiT5qwTHRD635EeoZnyWR
```

## License

MIT
