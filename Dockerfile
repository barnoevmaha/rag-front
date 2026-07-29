# --- Build stage ---
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Serve stage: nginx serves the built static files and proxies /api/*
# to the backend. The template + envsubst mechanism below is the official
# nginx image's own feature (any *.template file placed in
# /etc/nginx/templates/ is rendered to /etc/nginx/conf.d/ at container
# startup) - no custom entrypoint script needed ---
FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Restricts envsubst to exactly these two variable names, so nginx's own
# runtime variables ($host, $remote_addr, $scheme, ...) in the template
# are guaranteed to survive untouched regardless of what else is in the
# container's environment (Railway injects several RAILWAY_* variables).
ENV NGINX_ENVSUBST_FILTER='^(PORT|BACKEND_INTERNAL_URL|NGINX_LOCAL_RESOLVERS)$'

# Sane defaults so `docker build` + `docker run` (and docker-compose, which
# doesn't set these) behave exactly like the previous static config did.
# Railway overrides both at deploy time - PORT automatically, and
# BACKEND_INTERNAL_URL is a variable you set to the backend's private
# domain (see README's Railway section).
ENV PORT=80
ENV BACKEND_INTERNAL_URL=http://backend:8000

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- "http://localhost:${PORT}/" || exit 1
