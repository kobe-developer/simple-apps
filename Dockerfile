FROM node:18.20.8-slim

WORKDIR /app

COPY . /app/

RUN npm install

CMD ["npm", "start"]