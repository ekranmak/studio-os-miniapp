FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json /app/package.json
COPY apps/api/package.json /app/apps/api/package.json
RUN npm install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . /app
RUN npm run prisma:generate
RUN npm run build:api

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app /app
EXPOSE 4000
CMD ["sh", "-c", "cd /app/apps/api && npx prisma db push && node dist/main"]
