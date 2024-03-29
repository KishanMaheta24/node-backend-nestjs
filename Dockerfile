FROM node:21-alpine3.18
WORKDIR /App
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "npm", "run","start:dev" ]
 