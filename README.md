# 7F | Premium Digital Solutions & Hosting

A modern, high-performance website template for hosting and digital services.

## 🛠️ Configuration

This website is designed to be easily customizable. To change the website name, logo, social links, or metadata, simply edit the configuration file:

- `links`: Social links (Discord, Twitter).
- `copyright`: Custom footer copyright text.
- `cartStorageKey`: The key used for localStorage.
- `payments`: Your PayPal email and IBAN for customer reference.

**File:** `src/config/site.ts`

```typescript
export const siteConfig = {
  name: "Your Brand Name",
  shortName: "Brand",
  description: "Your site description...",
  logoUrl: "...",
  // ... and more
};
```

## 🚀 Getting Started

1. **Install Dependencies:**
   ```sh
   npm install
   ```

2. **Run Development Server:**
   ```sh
   npm run dev
   ```

3. **Build for Production:**
   ```sh
   npm run build
   ```

## 🛠️ Production Readiness Checklist

Before going live, complete these steps to ensure all integrations work correctly:

### 1. Email (SMTP) Setup
To send real "No-Reply" emails from your domain:
1. Create a `.env` file in the root directory.
2. Add your SMTP credentials (see `.env.example`).
3. These will be used by the backend to send registration confirmations.

### 2. PayPal Integration
1. Go to [PayPal Developer Portal](https://developer.paypal.com).
2. Create a "Live" App and copy the **Client ID**.
3. Update `paypalClientId` in `src/config/site.ts`.

### 3. Discord Bot Integration
Whenever you make changes to the bot's logic or data tracking:
1. Stop the bot process.
2. Run `node index.js` (or your start command).
3. Check the `#⚽-·-server-logs` for the startup confirmation.

### 4. Shared Data Sync
Ensure both the Website and the Bot have access to the same `data/` folder.
Current path: `e:\discord bots\7Flxherberg 1FLMod\data\`

## 📂 Project Structure

- `src/config/site.ts` - Centralized branding management.
- `src/components/` - Reusable UI components.
- `src/pages/` - Main page layouts.
- `public/` - Static assets (icons, robots.txt).
