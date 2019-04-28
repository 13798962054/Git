# IT部门工作

## 一：维润赛润

### 1、服务器连接

#### (1)、[维润赛润](http://www.virion-serion.net/)后台（[美橙互联](https://www.cndns.com/)）

a）、[后天网页维护页面](http://www.virion-serion.net/dede1)

管理员账号：admin

管理员密码：:jdf82411968

b）、[FTP服务器](ftp://jdf88888.w3.cndns5.com)

FTP用户名：jdf88888

FTP密码：jdf@82411968

c）、[美橙会员](http://www.cndns.com/userpanel/ )

账号：vip_qcg@163.com

密码：JDF168

#### (2)、启动FTP的方法

（1）进入美橙会员中心

（2）进入虚拟云主机

![1555547966351](E:\owen\data\TyporaData\IT部门工作\美橙会员中心.png)

（3）管理虚拟云主机

![1555548106672](E:\owen\data\TyporaData\IT部门工作\美橙管理虚拟云主机.png)

（4）启动FTP

![1555548146883](E:\owen\data\TyporaData\IT部门工作\美橙启动FTP.png)

## 二、[深圳科隆生物新材料有限公司](http://www.klonnewbio.com/)

#### (1)、[测试网络](http://php.heyou51.cn/zzr/klsw/heyou/)

账号：admin

密码：xw--57as6i

#### (2)、[服务器后台](http://www.klonnewbio.com/heyou)

账号：admin

密码：xw--57as6i

## 三、[中南医学实验室](http://www.csmedlab.com/)

## 四、微信公众号

### (1)、中南（暂无权限）

名称：中南检验

账号：zhongnan2017@sina.com

密码：jdf88888

### (2)、京迪丰

名称：京迪丰科技

（原王应注册[jingdifeng2015@163.com](mailto:jingdifeng2015@163.com)，2018年11月16日变更）

账号：jdftech@163.com

密码：jdf88888

### (3)、中润

名称：中润医学技术研究院

账号：sinorun2017@126.com

密码：jdf88888

### (4)、维润

名称：维润赛润

（原王应注册[virionserion@sina.com](mailto:virionserion@sina.com)，2018年11月16日变更）

账号：1524108715@qq.com

密码：jdf88888

### (5)、科隆

名称：科隆生物新材料

账号：klonnewbio@126.com

密码：jdf88888

(原密码klon20180419在2019年2月14日星期四失效)

### *公众号资料来源

(1)、[生物探索](http://www.biodiscover.com/)

(2)、[检验医学网](<http://www.labmed.cn/>)

(3)、[中国疫苗网](http://www.cnvax.com/)







## *、常见错误

### 1、FTP连接错误

**1. Ftp服务器连接失败: 连接被拒, 错误信息:**

[右] 正在连接到 www.yourdomain.com -> DNS=www.yourdomain.com IP=127.0.0.1 PORT=21
[右] 连接失败 (连接被拒)

**原因**:这是因为客户在作Ftp上传时 填写错Ftp服务器造成这个问题.
**解决**:在Ftp上传时记得一定要使用我司的Ftp服务器

**2. 530错误，Ftp 用户登入失败， 错误信息如下:**

[右] 正在连接到 www.cndns.com ->  IP=127.0.0.1 PORT=21
[右] 已连接到 127.0.0.1 (Ftp服务器连接成功)
[右] 220 Serv-U FTP Server v6.2 for WinSock ready...
[右] USER test 
[右] 331 User name okay, need password.
[右] PASS (隐藏)
[右] 530 Not logged in.

**原因**:这是用户填写错误的Ftp用户名/或Ftp密码
**解决**:请您核对您的Ftp 信息.如果您忘记Ftp密码.可以在我们管理中心的虚拟主机管理里重设Ftp密码

**3. 426错误，文件上传失败,错误信息如下:**

[右] 正在打开数据连接 IP: 127.0.0.1 端口: 10023
[右] STOR test.txt            ### 开始上传文件 test.txt
[右] 150 Opening BINARY mode data connection for test.txt.
[右] 426 Data connection closed, error decompressing data stream.
[右] 传送失败!   ### 文件上传失败

**原因**: 当上传文件大小为0的空文件时,系统会提示上传失败.实际该文件名在服务器已经创建了
**解决**:  这个错误是FlashFxp 客户端软件的误报错.实际文件已经上传上去了.

**4. 452错误，文件上传失败,错误信息如下:**

[右] STOR test.txt ### 开始上传文件 test.txt
[右] 150 Opening BINARY mode data connection for test.txt.
[右] 452-Maximum disk quota limited to 30720 kBytes
[右] Used disk quota 30692 kBytes, available 27 kBytes
[右] 452 Sorry, insufficient disk quota - ### 这里提示磁盘空间不够
[右] 传送失败!   ### 文件上传失败

**原因**: 当用户磁盘空间不够
**解决**: 您可以在虚拟主机管理 查看您网站剩余的空间容量, 需要升级到更大的空间，或者删除您网站上不必要的数据.

以上总结了 Ftp上传中的常见错误,您可以对照错误解决您上传网站到空间中遇到的问题