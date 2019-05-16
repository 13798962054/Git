问题：Tools ->Install package control 失败

解决：打开C:\Windows\system32\drivers\etc\hosts文件
增加

50.116.34.243 sublime.wbond.net
50.116.34.243 packagecontrol.io



问题：“There are no packages available for installation”

解决方案1：打开Sublime Text，点击**Sublime Text**->**Preferences**->**Settings - User**，添加如下代码：

```
"channels":
 [
    "http://cst.stu.126.net/u/json/cms/channel_v3.json",
 ],
```

