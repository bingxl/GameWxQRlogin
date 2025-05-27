# 安卓游戏微信扫码登录

支持：王者荣耀，英雄联盟，和平精英，欢乐麻将，欢乐斗地主，QQ飞车……

理论上支持所有支持微信扫码登录的游戏

[查看游戏列表](/games/gameList-min.json?raw=true)

## 登录方式一

1.打开要登录的应用，注销当前登录，有用户协议就勾选，点击微信登录

2.跳转到微信后（不要点授权确定），打开或切换到扫码APP，出现二维码后点击分享给对方。

3.在扫码APP内等待对方扫码授权，成功授权后会自动跳转登录。

## 登录方式二

1.打开要登录的应用，注销当前登录。

2.登录页如有用户协议等，勾选后游戏切换后台

3.切换到扫码APP，出现二维码后点击分享给对方

4.在扫码APP内等待对方扫码授权就可以自动跳转并登录应用。

5.如果跳转后没有自动登录，请杀掉游戏进程，重新打开应用查看。

# 如果上面两种都不行，那就是失效了

## 增加软件
1. fork 项目
2. 在 `games/list` 文件夹下建立一个自己的json文件，文件格式参考 `games/list/pgr.json`, 添加软件对应的信息
3. 运行 `node build.js`，没有报错信息后发 `pull request`

## 如何获取软件的 `appId` 与 `bundleId`
- bundleId 非常容易获取，打开系统设置里找到软件对应的应用详情页，其中的应用包名就是 bundleId
- appId 则稍微复杂点：
1. 首先使用adb连接手机(网上找教程), 链接好后打开需要登录的软件到操作到点击微信图标之前
2. 先执行`adb logcat -c`， 再执行 `adb logcat`
3. 软件里点击微信登录
4. 查看 `adb logcat` 的输出，里面会包含 `appId`

<br>
<div style="float: left">
<img src="/screenshot/Screenshot1.jpg?raw=true" width="300">
<img src="/screenshot/Screenshot2.jpg?raw=true" width="300">
</div>
