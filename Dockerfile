# 构建阶段
FROM node:18-slim AS builder

WORKDIR /app

COPY . .

RUN npm i -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install

RUN pnpm build 


# 运行阶段
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install --prod --frozen-lockfile

ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_NAME

ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_NAME=$DATABASE_NAME

EXPOSE 3600

CMD [ "npm", "run", "start:prod" ]





