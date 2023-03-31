FROM node:14.15-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM  nginx:1.23.4-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step app/dist/challenge-w2-m /usr/share/nginx/html
COPY --from=build-step app/src/mockserver/db.json /data/db.json
RUN apk add --update nodejs npm
RUN npm i -g json-server
EXPOSE 3000

CMD json-server --watch /data/db.json --port 3000 --host 0.0.0.0 & nginx -g 'daemon off;'