FROM node:20

WORKDIR /usr/src/app/server/

COPY ["package*.json", ".env", "./"]

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]