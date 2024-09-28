FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run generate

FROM caddy:2.8.4-alpine

WORKDIR /app

COPY --from=builder /app/.output/public /journey-save-parser
