# NPM React TypeScript Starter 

可以直接使用 React TypeScript 開發Npm 套件，使用 module CSS 支持hot reloading

## 使用方法

### 安裝

 git clone 後，安裝套件，於主目錄

```
～$ yarn 
```

react 目錄安裝套件

```
～$ cd example 
~example$ yarn
```

### 開發

開始監視變化，支援 hot reloading

```
～$ yarn watch
```

調試code，切換到 example 後yarn start 開啟 react

```
～$ cd example 
~example$ yarn
```

修改 src/index.tsx 的檔案react就會發生變化

>  Note: 修改css的時候，需要先在 module.css裡面先建立css，再回到index引入，不然會造成rollup 打包錯誤

