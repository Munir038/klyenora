# Klyenora API

## Setup

1. Start MongoDB locally or create a MongoDB Atlas cluster.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`, `MONGODB_DATABASE`, and a strong `JWT_SECRET`.
3. Run `npm install`, then `npm run db:setup` and `npm run dev` from this directory.
4. Create an account with `npm run db:create-user -- "Rahul Kumar" rahul@example.com change-me`.

## Login API

`POST /api/v1/auth/login`

```json
{ "email": "owner@example.com", "password": "your-password" }
```

The API responds with `{ "success": true, "data": { "user": {}, "token": "..." } }`.

Passwords must be stored as bcrypt hashes. Example hash generation:

```sh
node -e "import('bcryptjs').then(({default:bcrypt}) => bcrypt.hash('change-me', 12).then(console.log))"
```
