# Cosmic Arcana mobile

Expo + React Native client (iOS, Android, web). Readings are **fiction**. NASA data, if wired later,
is symbolic only.

Built by **vibe coding**: Claude remote control **and** Cursor (~$190 usage credits left after the
hackathon). No Auth0 on this app yet — demo `userId` until you create a native Auth0 app (see
`docs/completeness-audit.md` owner TODOs).

## Run

```bash
npm ci
cp .env.example .env
# optional: point at tarot-service-api
npm start
```

`npm start` runs Expo Go (`--go`). Then press `a` / `w`, or scan the QR code with Expo Go.

### Physical iPhone

1. Install Expo Go from the App Store. It must support the app's SDK (57 today; the store version
   targets 57).
2. Join the same Wi-Fi as the computer and allow Expo Go to use the local network when iOS asks.
3. Set `EXPO_PUBLIC_TAROT_BASE_URL` to the computer's LAN address, for example
   `http://192.168.1.20:3004`, and start `tarot-service-api` there.
4. `npm start`, then scan the QR code with the iPhone camera.

Development builds (`--dev-client`) need `ios.bundleIdentifier` and `android.package` in `app.json`.
Neither is chosen yet, so Expo Go is pinned in the scripts instead of inventing an app id.

## What it does

- **Ask** — posts `POST /spreads` when `EXPO_PUBLIC_TAROT_BASE_URL` is set. Shows stub
  `positionKey` / `cardId` / `reversed` / `prediction` from tarot-service-api. No invented meanings.
- **About** / disclaimer modal — product framing.

Auth0 is not configured (no mobile Auth0 app). A fixed demo `userId` is used until
authority-service-api exists.

Spread types, card meanings, and prediction format remain owner questions (`docs/context/gaps.md`).
