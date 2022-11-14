# Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/ishowo-frontend /usr/share/nginx/html
