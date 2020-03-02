## 	*指令

1、搜索目录下包含某一字段的文件

```bat
find . | xargs grep "custom"
# 只查看文件， 不查看目录
find . -type f | xargs grep "custom"
# 只列出文件名
find . -type f | xargs grep "搜索框" -l
# 搜索当前目录下
 grep -r "搜索框" -l


```

## *问题

#### 1、Unable to locate package错误解决办法

```cpp
sudo apt-get update
```

​        究其原因，应该是刚安装，软件源还来不及更新，所以才会无法找到包。我猜测在更换软件源之后，也很可能会出现这个问题。

2、

