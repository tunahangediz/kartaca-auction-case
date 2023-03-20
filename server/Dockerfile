FROM node:17.0.1-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY .  /app
EXPOSE 4000
ENV PORT=4000
EXPOSE $PORT
CMD ["npm","run","dev"]