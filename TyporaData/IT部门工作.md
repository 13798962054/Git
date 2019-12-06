# IT部门工作

## 一：维润赛润

### 1、服务器连接

#### (1)、[维润赛润](http://www.virion-serion.net/)后台（[美橙互联](https://www.cndns.com/)）

a）、[后天网页维护页面](http://www.virion-serion.net/dede1)

管理员账号：admin

管理员密码：jdf82411968

b）、[FTP服务器](ftp://jdf88888.w3.cndns5.com)

FTP用户名：jdf88888

FTP密码：jdf@82411968

c）、[美橙会员](http://www.cndns.com/userpanel/ )

账号：vip_qcg@163.com

密码：JDF168

*2019/9/6大修改

```ini
# 修改文件有：
1、根目录添加了css、js文件夹（给index-2.html）用，可删
2、skin目录下的css/common.css、css/base.css、js/common.js
3、产品中心的所有页面
# 修改内容：
1、通过json格式保存表单内容（保存格式如下）
2、通过js添加左侧的导航栏
```



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

#### 1、实验室路由器

地址：192.168.10.1

账号：admin

密码：zn22295590

#### 2、[服务器后台](http://1747888961.bj.wezhan.cn/admin/siteadmin/v2Index)

账号：774342_31@wezhan.cn

密码：QcISFH

手机号码：18925214245 密码：jdf88888

## 四、[深圳市京迪丰科技有限公司](http://www.jdf-tech.com.cn)

#### 1、[服务器后台](http://www.jdf-tech.com.cn/admin/)

账号：jdf168

密码：jdf168

## 五、微信公众号

### 1、中南

名称：中南检验

账号：zhongnan2017@sina.com

密码：jdf88888

### 2、京迪丰

名称：京迪丰科技

（原王应注册[jingdifeng2015@163.com](mailto:jingdifeng2015@163.com)，2018年11月16日变更）

账号：jdftech@163.com

密码：jdf88888

### 3、中润

名称：中润医学技术研究院

账号：sinorun2017@126.com

密码：jdf88888

### 4、维润

名称：维润赛润

（原王应注册[virionserion@sina.com](mailto:virionserion@sina.com)，2018年11月16日变更）

账号：1524108715@qq.com

密码：jdf88888

### 5、科隆

名称：科隆生物新材料

账号：klonnewbio@126.com

密码：jdf88888

(原密码klon20180419在2019年2月14日星期四失效)

### *公众号资料来源

(1)、[生物探索](http://www.biodiscover.com/)

(2)、[检验医学网](<http://www.labmed.cn/>)

(3)、[中国疫苗网](http://www.cnvax.com/)



## 六、企业邮箱

账号：owen.yang@csmedlab.com

密码：

## 七、红岭北办公室

#### 1、路由器

地址：192.168.0.1

账号：admin

密码：admin



## 八、公司软件

### 1、4plassist激活验证码

81660+



## 九、先科四楼

1、路由器（360安全路由）

地址：192.168.1.1

账号：admin

密码：jdf88888





## *、常见错误

### 一、FTP连接错误

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
**解决**: 您可以在虚拟主机管理 查看您网站剩余的空间容量 

以上总结了 Ftp上传中的常见错误,您可以对照错误解决您上传网站到空间中遇到的问题

### 二、[湖北省药械集中采购服务平台](http://www.hbyxjzcg.cn/)无法访问问题

解决方案：为[hosts](C:\Windows\System32\drivers\etc)文件添加一行27.17.15.195 www.hbyxjzcg.cn

偏方：将适配器DNS改成144.144.144.144

## 九、网站改动

1、2019/10/22 科隆网站改动

```shell
# 删除公司介绍
深圳科隆生物新材料有限公司成立于2018年，运营团队来自创办于1999年的深圳市京迪丰科技有限公司，创始人在体外诊断领域深耕近20年，创建了一流的专业团队，积累了丰富行业经验，通过国际贸易不断开拓国际视野，与欧洲知名生物技术公司成功建立了紧密深度合作。此外，团队还创办了相关共建平台，包括深圳中南医学检验实验室、深圳中润医学技术研究院，并与德国维润赛润合资创办了维润赛润生物技术(深圳)有限公司，销售网络遍布全国。

深圳科隆生物新材料作为产业实现平台，将借助于创始团队的丰富行业经验及资源积累，一方面利用IVD上游原材料的国际合作优势，实现在IVD上游的快速发展，另一方面，基于原材料及技术优势，研发生产具有竞争力的试剂产品。

公司将不断从海外引进领先的技术，为合作伙伴提供从原材料定制到优化解决方案的系列服务。通过与深圳中润医学技术研究院专家的合作，借助深圳中南医学检验实验室的科研平台，在应用科学领域提供前沿研究和行业发展新趋势。


# 删除公司首页介绍
深圳科隆生物新材料有限公司成立于2018年，运营团队来自创办于1999年的深圳市京迪丰科技有限公司，创始人在体外诊断领域深耕近20年，创建了一流的专业团队，积累了丰富行业经验，通过国际贸易不断开拓国际视野，与欧洲知名生物技术公司成功建立了紧密深度合作。此外，团队还创办了相关共建平台，包括深圳中南医学检验实验室、深圳中润医学技术研究院，并与德国维润赛润合资创办了维润赛润生物技术(深圳)有限公司，销售网络遍布全国。

深圳科隆生物新材料作为产业实现平台，将借助于创始团队的丰富行业经验及资源积累，一方面利用IVD上游原材料的国际合作优势，实现在IVD上游的快速发展，另一方面，基于原材料及技术优势，研发生产具有竞争力的试剂产品。

公司将不断从海外引进领先的技术，为合作伙伴提供从原材料定制到优化解决方案的系列服务。通过与深圳中润医学技术研究院专家的合作，借助深圳中南医学检验实验室的科研平台，在应用科学领域提供前沿研究和行业发展新趋势。

#删除传真
传真地址： 	klonnewbio@klonnewbio.com 
Fax address： 	klonnewbio@klonnewbio.com 
```



## *、实用小技巧

1、快速查看电脑所连接的路由器的ip

在DOS下输入Tracert www.baidu.com 第一条就是

*邮箱

owen.yang@csmedlab.com







