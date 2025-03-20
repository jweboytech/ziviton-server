# 项目说明

> 运行之前确认：
> ARG DATABASE_HOST
> ARG DATABASE_PORT
> ARG DATABASE_USER
> ARG DATABASE_PASSWORD
> ARG DATABASE_NAME
> 这些数据库的变量已经被正确设置了，docker 打包的时候会自动注入。

## 自动构建部署

- 修改 `exec.sh` 里的用户名

```js
IMAGE_NAME = jweboy / $PROJECT_NAME;
```

- 修改 `docker-image.yml` 里的 `host`，改成需要挂载的用户名下面。

```js
- name: Set the host
    id: host
    run: echo "HOST=docker.io/jweboy" >> $GITHUB_ENV
```

- 推动代码到 `dev` 分支，会自动触发 `github action` 。

  - 运行 `build` 构建打包产品
  - 制作 `image` 镜像
  - 推送 `image` 镜像

- 拷贝 `exec.sh` 脚本到服务器。
- 执行 `sh exec.sh` 命令。

## 手动构建镜像

- 修改 `exec.sh` 里的用户名

```js
IMAGE_NAME = jweboy / $PROJECT_NAME;
```

### 方案一

- 修改 `docker-image.yml` 里的 `host`，改成需要挂载的用户名下面。

```js
- name: Set the host
    id: host
    run: echo "HOST=docker.io/jweboy" >> $GITHUB_ENV
```

- 手动触发 `github action`。
- 拷贝 `exec.sh` 脚本到服务器。
- 执行 `sh exec.sh` 命令。

### 方案二

- 执行 `exec.sh` 里的下面两条命令来打包上传镜像。

```js
docker build -f Dockerfile -t=$IMAGE_NAME:$VERSION .

docker push $IMAGE_NAME
```

- 登录服务器执行下面的命令。

```js

docker run --name $PROJECT_NAME -itd --restart=always -p $PORT:$PORT $IMAGE_NAME:$VERSION
```

- 也可以直接拷贝 `exec.sh` 到服务器执行，他会自动关闭已运行的 `container` 然后生成一个新的。
