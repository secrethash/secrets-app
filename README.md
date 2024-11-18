<p align="center"><a href="https://frore.co" target="_blank"><img src="https://cdn.frore.co/images/frore-favicon.svg" width="250" alt="frore.co Logo"></a><br/>Sharing <strong>secrets</strong> with confidence.</p>

# Secrets Sharing App

> :warning: **This is a completely experimental (proof-of-concept) project and should be used at your own risk.**

Secret sharing application using Asymmetric Encryption (public/private key pair). We can create a new Key Pair and save the Public Key to a Supabase DB table. We can then encrypt a secret with the Public Key and decrypt it with the Private Key.

The encryption & decryption is done using `RSA-OAEP` algorithm, for which the keys are 2048 bits long & supports asymmetric encryption. The application generates & accepts Private & Public Keys in `JWK` format.

## On-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffroreco%2Fsecrets-app%2Ftree%2Fmain&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20URL%20%26%20Keys&project-name=secrets-sharing-app&repository-name=secrets-sharing-app&redirect-url=https%3A%2F%2Fgithub.com%2Ffroreco%2Fsecrets-app%2Ftree%2Fmain)

## Use Case (example)

- Securely Sharing Username/Password with a team member over an email as an encrypted text
- Sharing `.env` files with a team member over slack/teams as an encrypted text
- Sharing sensitive information with a third party
- Sharing sensitive information with a client

## Features

- 🔑 Create new Key Pair (public/private)
- 🛅 Save Public Keys to Supabase DB table
- 🔐 Encrypt a secret with a Public Key (also fetch from supabase)
- 🔓 Decrypt a secret only by a Private Key

## Demo Video

https://github.com/user-attachments/assets/8e5b29e9-6408-490b-a73b-3c171c4a6043

## Roadmap

- [x] **Persistence:** Add Supabase DB table to store Public Keys with titles
- [x] **Authn:** Add Authentication using [Supabase Auth](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [ ] **Security:** Add ECDA (Elliptic Curve Digital Signature Algorithm) support to sign the encrypted secret for increased security
- [ ] **Chore:** Cleanup application code style and structure (project was created as a Proof of Concept)
- [ ] **Authz:** Limit fetch from supabase for authenticated & authorized users (something roles/permissions)

## Installation

Install the dependencies:

```bash
bun install
```

## Getting Started

1. Copy the `.env.example`  file to  `.env.local`  and fill in the values.

    ```bash
    cp .env.example .env.local
    ```

2. Setup Supabase credentials in `.env.local`

3. Create a `public_keys` table in Supabase with the following schema:

    > 💡 You can go to your Project > SQL Editor (left sidebar) > paste the following SQL query and execute it

    ```pgsql
    create table
        public.public_keys (
            id uuid not null default gen_random_uuid (),
            title text null,
            key text null,
            created_at timestamp with time zone not null default now(),
            constraint public_keys_pkey primary key (id),
            constraint public_keys_title_key unique (title)
        ) tablespace pg_default;
    ```

4. Make sure the **Row Level Security (RLS)** policy are set properly in Supabase for the table `public_keys`. Make sure the `INSERT` & `SELECT` policies have the role `anon` & `authenticated` set.

5. Run the development server:

    ```bash
    bun dev
    ```

    > Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Registration

As this tool is meant for internal or personal use, the registration is limited to your projects organization members only (on supabase). To open up the registration you may need to setup custom SMTP provider in the [Supabase Authentication](https://supabase.com/docs/guides/auth/auth-smtp) settings.

## Disclaimer

This project is for internal purposes only. It is not intended to be used for any production environment. The author or contributors are not responsible for any damages caused by the use of this project. Use it at your own risk.

## Licence

This project is an open-sourced software licensed under the [MIT license](./LICENSE.md).

<br><br>
---
<p align="center">Copyright © 2024 <a href="https://frore.co" target="_blank">Frore.co</a></p>
