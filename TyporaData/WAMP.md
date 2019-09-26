# Apache

#### 1、http.conf添加php环境

LoadModule php7_module "E:/owen/software/wamp/php-7.3.5/php7apache2_4.dll"
PHPIniDir "E:/owen/software/wamp/php-7.3.5/php.ini"

LoadFile "E:/owen/software/wamp/php-7.3.5/php7ts.dll"
LoadFile "E:/owen/software/wamp/php-7.3.5/libcrypto-1_1-x64.dll"
LoadFile "E:/owen/software/wamp/php-7.3.5/libssl-1_1-x64.dll"
LoadFile "E:/owen/software/wamp/php-7.3.5/libssh2.dll"

```xml
# 添加PHP支持
AddType application/x-httpd-php .php
```

然后修改首页文件类型支持：

```xml
<IfModule dir_module>
    DirectoryIndex index.html index.htm index.php
</IfModule>

```

#### 2、重启Apache

httpd.exe -k restart

#### 3、添加端口和监听的文件夹(httpd.conf)

```xml
Listen 8080
<VirtualHost *:8080>
    DocumentRoot E:\owen\software\wamp\Apache24\htdocs\startProject
</VirtualHost>
<Directory "E:\owen\software\wamp\Apache24\htdocs\startProject">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```



# php

1、连接数据库错误

The server requested authentication method unknown to the client

解决方法：

1. Log in as root to mysql

2. Run this sql command:

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';  
```

