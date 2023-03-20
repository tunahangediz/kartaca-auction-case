FROM node:17.0.1-alpine3.14

WORKDIR /app

COPY package*.json .

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm","run" ,"start"]
