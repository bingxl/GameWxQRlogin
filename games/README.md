# GameWxQRlogin 自定义game

## 使用方法
1. 编辑 `gameList.json` 添加需要的软件;
2. 运行 `node build.js`; 将 `gameList-min.json` `version.json` 上传到公网上
3. 克隆GameWxQRlogin 仓库  `https://github.com/GameWxQRlogin.git`
4. 修改文件 `app/src/main/java/com/willh/wz/Constant.java` 中的 'API_VERSION' 'API_MENU' 值
    - `API_VERSION` 指向公网的`versioin.json`; `API_MENU` 指向 公网的`gameList-min.json`
    - 或者直接使用本仓库提供的json文件 `https://cdn.jsdelivr.net/npm/game-wx-qr-login/gameList-min.json` \
      与 `https://cdn.jsdelivr.net/npm/game-wx-qr-login/version.json`
5. 构建安装应用