<p align="center"><a href="https://frore.co" target="_blank"><img src="https://cdn.frore.co/images/frore-favicon.svg" width="250" alt="frore.co Logo"></a><br>frore. <strong>Secrets</strong></p>

# Secrets App

Secret sharing application using Asymmetric Encryption (public/private key pair). We can create a new Key Pair and save the Public Key to a Supabase DB table. We can then encrypt a secret with the Public Key and decrypt it with the Private Key.

- [Sharing Secrets with Confidence](https://frore.atlassian.net/wiki/x/JYHxAw)

## Features

- 🔑 Create new Key Pair (public/private)
- 🛅 Save Public Keys to Supabase DB table
- 🔐 Encrypt a secret with a Public Key (also fetch from supabase)
- 🔓 Decrypt a secret with a Private Key

## Roadmap

- [ ] Add Authentication using [Supabase Auth](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [ ] Limit fetch from supabase for authenticated users (maybe with roles/permissions)

## Installation

Install the dependencies:

```bash
bun install
```

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

> :construction: This module is under construction.

## Licence

The project is a commercial software licensed under the Proprietary License. All rights reserved.

<br><br>
---
<p align="center">Copyright © 2024 <a href="https://frore.co" target="_blank">Frore.co</a></p>