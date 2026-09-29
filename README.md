# Cosmic Arcana mobile

Expo + React Native client (iOS, Android, web). Readings are **fiction**. NASA data, if wired later,
is symbolic only.

## Run

```bash
npm ci
cp .env.example .env
# optional: point at tarot-service-api
npx expo start
```

Then press `i` / `a` / `w`, or scan the QR code with Expo Go.

## What it does

- **Ask** — posts `POST /spreads` when `EXPO_PUBLIC_TAROT_BASE_URL` is set. Shows stub
  `positionKey` / `cardId` / `reversed` / `prediction` from tarot-service-api. No invented meanings.
- **About** / disclaimer modal — product framing.

Auth0 is not configured (no mobile Auth0 app). A fixed demo `userId` is used until
authority-service-api exists.

Spread types, card meanings, and prediction format remain owner questions (`docs/context/gaps.md`).
