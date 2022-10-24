FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm i bcrypt --unsafe-perm=true --allow-root --save

COPY . .

RUN npm run build

ENV NODE_ENV=production

USER node 

CMD ["node", "build/app.js"]