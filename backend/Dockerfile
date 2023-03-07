FROM node:18

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i && npm shrinkwrap

COPY . .
EXPOSE 3000
CMD pnpm start
