FROM node

RUN mkdir /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn install && yarn cache clean

RUN yarn build

CMD ["npm", "start"]