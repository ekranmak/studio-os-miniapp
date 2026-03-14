FROM node:22-alpine AS install
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:22-alpine AS build_stage
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:22-alpine AS final
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build_stage /app/public ./public
COPY --from=build_stage /app/.next ./.next
COPY --from=build_stage /app/node_modules ./node_modules
COPY --from=build_stage /app/package.json ./package.json
EXPOSE 3000
ENV HOSTNAME=0.0.0.0
CMD ["npm", "run", "start"]
