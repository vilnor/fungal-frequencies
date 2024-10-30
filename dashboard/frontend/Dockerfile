FROM node:latest

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm ci

COPY ./tsconfig.json .
COPY ./src ./src
COPY ./public ./public
COPY ./.env .
CMD ["npm", "run", "prod"]