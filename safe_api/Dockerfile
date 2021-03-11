FROM node:15

WORKDIR /code
COPY . .
RUN npm install

CMD ["node","./node_modules/nodemon/bin/nodemon.js", "index.js"]