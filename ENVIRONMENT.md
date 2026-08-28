# Environment Configuration ⚙️

This document outlines environment variables, API base URL configuration, and local setup defaults.

---

## 🔑 Environment Variables Schema

Create a `.env` file in the root directory (never commit `.env` files to git):

```env
# Application Mode & API Base Endpoint
VITE_APP_NAME="ForgeUI Enterprise"
VITE_API_BASE_URL="https://api.example.com/v1"
VITE_ENABLE_ANALYTICS=false

# Optional Feature Flags
VITE_ENABLE_THEME_CUSTOMIZER=true
VITE_DEFAULT_THEME="system"
VITE_DEFAULT_PALETTE="red-black"
```

---

## 🔒 Security & Best Practices

1. **Vite Prefix**: Only environment variables prefixed with `VITE_` are exposed to the client-side bundle via `import.meta.env`.
2. **Never Commit Secrets**: Never place private secret keys, database credentials, or AWS tokens in client-side `.env` files.
