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

ENV DATABASE_HOST=rm-bp12313puo3721p4ypo.mysql.rds.aliyuncs.com
ENV DATABASE_PORT=3306
ENV DATABASE_USER=petusertest
ENV DATABASE_PASSWORD=2066JJKKJOL0688!
ENV DATABASE_NAME=jwboy

EXPOSE 3600

CMD [ "npm", "run", "start:prod" ]





