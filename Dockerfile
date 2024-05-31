FROM node:lts-alpine3.16

ENV PORT=3020

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
EXPOSE 3020
CMD [ "npm", "start"]