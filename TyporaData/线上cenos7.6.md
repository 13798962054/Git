118.31.71.79

524190

# 1、安装LAMP

# 2、安装FTP

#### 开启阿里云端口权限

阿里云服务器端口权限是由安全组规则控制，所以配置FTP服务，需要打开服务器的20/21端口权限。

![img](https://upload-images.jianshu.io/upload_images/3447910-4babe4bf59f27e83.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

由于需要FTP支持被动模式（PASV），所以还需要开启有限范围的端口权限比如（40000-40080）。

![img](https://upload-images.jianshu.io/upload_images/3447910-b9ba13a5c6e955f4.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

#### 安装vsftpd

```shell
yum install -y vsftpd
```

#### 修改vsftpd配置文件

```shell
vim /etc/vsftpd/vsftpd.conf
```

我的配置项如下：

```shell
anonymous_enable=YES     #允许匿名访问
local_enable=YES        #允许使用本地帐户登录FTP
write_enable=YES
local_umask=022

dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES

ascii_upload_enable=YES
ascii_download_enable=YES

chroot_local_user=YES       #允许本地用户切换到FTP主目录以外的目录
chroot_list_enable=YES      #白名单模式开启，只有/etc/vsftpd/chroot_list指定的用户才可以切换到主目录
chroot_list_file=/etc/vsftpd/chroot_list    #本地用户切换目录白名单文件

listen=YES

listen_ipv6=YES

pam_service_name=vsftpd
userlist_enable=YES
tcp_wrappers=YES

local_root=/home/www/apache/html    #FTP主目录

pasv_enable=YES         #开启PASV模式
pasv_min_port=40000     #PASV最小端口
pasv_max_port=40080     #PASV最大端口
pasv_promiscuous=YES

allow_writeable_chroot=YES      #允许写入目录(这项需要手动添加)
```

/etc/vsftpd/chroot_list文件如果不存在，创建一个空文件即可，否则无法开启FTP服务。

allow_writeable_chroot需要手动添加，否则FTP连接会报错。

#### 配置防火墙

```shell
firewall-cmd --zone=public --add-service=ftp --permanent
firewall-cmd --zone=public --add-port=21/tcp --permanent
firewall-cmd --zone=public --add-port=40000-40080/tcp --permanent
systemctl restart firewalld.service  
```

#### 开启FTP服务

添加到开启启动

```shell
systemctl enable vsftpd.service 
```

启动FTP服务

```shell
systemctl start vsftpd.service 
```

其他命令

```shell
systemctl stop vsftpd.service          #停止FTP服务 
systemctl restart vsftpd.service       #重启FTP服务
```

#### 新建用于登录FTP的本地用户

```shell
useradd -d /www -g ftp -s /sbin/nologin ftpuser     #新建用户名为ftpuser，不可用于系统登录
passwd ftpuser                                      #修改密码
```

#### 删除用户

```SHELL
userdel -r newuser
```

#### 卸载FTP

rpm -aq vsftpd

rpm -e vsftpd-3.0.2-25.el7.x86_64

# 3、安装宝塔

```shell
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install.sh && sh install.sh
```

```shell
实例：
Bt-Panel: http://118.31.71.79:8888
username: 2xhhdh55
password: 0cd1ee4e

```

