<p align="center"><a href="https://frore.co" target="_blank"><img src="https://cdn.frore.co/images/frore-favicon.svg" width="250" alt="frore.co Logo"></a><br/>Sharing <strong>secrets</strong> with confidence.</p>

# Secrets Sharing App

> :warning: **This is a completely experimental project and should not be used in production.**

Secret sharing application using Asymmetric Encryption (public/private key pair). We can create a new Key Pair and save the Public Key to a Supabase DB table. We can then encrypt a secret with the Public Key and decrypt it with the Private Key.

## Use Case

- Sharing Username/Password with a team member over an email
- Sharing sensitive information with a third party
- Sharing sensitive information with a client

## Features

- 🔑 Create new Key Pair (public/private)
- 🛅 Save Public Keys to Supabase DB table
- 🔐 Encrypt a secret with a Public Key (also fetch from supabase)
- 🔓 Decrypt a secret with a Private Key

https://github.com/user-attachments/assets/8e5b29e9-6408-490b-a73b-3c171c4a6043

## Roadmap

- [x] Add Authentication using [Supabase Auth](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [ ] Limit fetch from supabase for authenticated users (maybe with roles/permissions)

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

As this tool is meant for internal or personal use, the registration is limited to your projects organization members only (on supabase). To open up the registration you need to setup custom SMTP provider in the [Supabase Authentication](https://supabase.com/docs/guides/auth/auth-smtp) settings.

## Disclaimer

This project is for internal purposes only. It is not intended to be used for any production environment. The author or contributors are not responsible for any damages caused by the use of this project. Use it at your own risk.

## Licence

The project is a **commercial software licensed under the Proprietary License**. All rights reserved.

You can freely use & modify the project for your personal or internal purposes. However, you are not allowed to distribute, sell, or use the project for any commercial purposes without the explicit permission of the author.

<br><br>
---
<p align="center">Copyright © 2024 <a href="https://frore.co" target="_blank">Frore.co</a></p>
