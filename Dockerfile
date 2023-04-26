FROM node:16-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm i && npm run build --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/ticket-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
