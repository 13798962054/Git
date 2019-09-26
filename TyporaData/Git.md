### 大牛的git库

1、https://github.com/Jack-Cherish

![1556413370038](E:\owen\data\TyporaData\Git\1.png)

# *解决方案

### 1、github the file will have its original line endings in your working director

解决方法：

```BASH
git config --global core.autocrlf false
```

补充：

```BASH
Git下处理“换行”（line ending）

　　core.autocrlf是git中负责处理line ending的变量，可以设置3个值：true，false，inout。

（1）设置为true【config --global core.autocrlf true】

          当设置成true时，这意味着你在任何时候添加(add)文件到git仓库时，git都会视为它是一个文本文件(text file)。

　　　它将把crlf变成LF。

（2）设置为false【config --global core.autocrlf false】

   　　当设置成false时，line endings将不做转换操作。文本文件保持原来的样子。

（3）设置为input时，添加文件git仓库时，git把crlf编程lf。当有人Check代码时还是lf方式。因此在window操作系统下，不要使用这个设置。
```

### 2、解除GitHub上传文件大小限制

```BASH
git config http.postBuffer 524288000
```

之前git中的配置是没有这一项的,执行完以上语句后输入git config -l可以看到配置项的最下面多出了一行我们刚刚配置的内容. (52428000=500×1024×1024,即500M)