FROM node:current-alpine3.10

ENV NODE_ENV=production

WORKDIR /usr/app

COPY . .

RUN apk add --no-cache \
    python \
    g++ \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    && yarn install
    

#RUN yarn install

CMD ["yarn", "start"]
