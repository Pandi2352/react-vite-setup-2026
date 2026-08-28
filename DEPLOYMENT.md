# Production Deployment Guide 🚀

This document covers building and deploying ForgeUI to production platforms including Docker, Vercel, Netlify, and NGINX.

---

## 📦 Production Build Command

```bash
npm run build
```

This compiles TypeScript using `tsc -b` and builds optimized static assets into the `dist/` directory using Vite.

---

## 🐳 Docker Deployment

A production-ready multi-stage `Dockerfile`:

```dockerfile
# Stage 1: Build static assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve using NGINX Alpine
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## ⚡ Vercel & Netlify Deployment

- **Vercel**: Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist`.
- **Netlify**: Build Command `npm run build`, Publish Directory `dist`, Redirects Rule `/* /index.html 200`.
