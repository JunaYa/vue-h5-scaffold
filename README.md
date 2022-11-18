#

## 项目说明

适用于端内嵌页、微信分享页面

## install

## run

本地执行不同环境启动命令

- dev 环境设置 `pnpm run start:dev`
- stg 环境设置 `pnpm run start:stg`
- prd 环境设置 `pnpm run start:prd`

## commit

## deploy

netlify 部署需要在 netlify 平台配置对应环境的编译传参数。General/Build & deploy / Build settings 下设置编译命令。例如在

- stg 环境设置 `pnpm run build:stg`
- prd 环境设置 `pnpm run build:prd`
