# Vue3+Vite2+TS

# 多页应用

## 项目搭建时常见问题

- `vite.config.ts`中`import ··· from 'path'`报错

```js
解决方法：
yarn add @types/node -D
```

- `import`模块时报错`Could not find a declaration file for module 'xxx'`

```js
解决方法：
在 env.d.ts 文件中添加声明 declare module 'xxx';
```

- 代码中使用`window.xxx`报错`Property 'xxx' does not exist on type 'Window'`

```js
解决办法：
window ---> (window as any)
```

- 使用`yarn/npm build`报错`fs.rmSync is not a function`

```js
解决办法：
node使用`14.18.1`以上版本
```