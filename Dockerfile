FROM node:12.13.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

COPY --chown=node:node . .

USER node

EXPOSE 3003

CMD ["node", "index.js"]

