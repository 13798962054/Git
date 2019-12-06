## 一、CAD

### 1、Auto CAD2020 激活页面白屏解决方案：

```ini
1、将IE版本升级至11以上

2、打开IE浏览器Java脚本
```

### 2、CAD中文乱码问题解决方案：

解决方案一：

```ini
使用gbcbig.shx作为替换字体
```

解决方案二：

```ini
# 打开工具选项
命令行输入op
```

![](E:\owen\data\TyporaData\Auto\中文乱码.jpg)

```ini
# 为acad.fmp添加字体映射
hzfs;gbcbig.shx
hztxt;gbcbig.shx
lmp;gbcbig.shx
okv;gbcbig.shx
OMV;gbcbig.shx
tssdchn;gbcbig.shx
dxt;gbcbig.shx
hzfsl;gbcbig.shx
syfs;gbcbig.shx
ectext;gbcbig.shx
HZTXTO;gbcbig.shx
hzdx;gbcbig.shx
hhztxt;gbcbig.shx
gbhzfs;gbcbig.shx
```

![](E:\owen\data\TyporaData\Auto\中文乱码_设置fmp文件)

### 3、常用指令

直线：line

移动：move

标记直线距离：dimliner

