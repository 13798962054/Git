### *解决方案

1、nginx: [error] CreateFile() "E:\owen\software\nginx/logs/nginx.pid" failed (2: T he system cannot find the file specified)



解决方法：

使用命令创建/logs/nginx.pid文件:

nginx -c conf/nginx.conf

nginx常用命令：

验证配置是否正确: nginx -t

查看Nginx的版本号：nginx -V

启动Nginx：start nginx

快速停止或关闭Nginx：nginx -s stop

正常停止或关闭Nginx：nginx -s quit

### 1、查找nginx的pid

tasklist /fi "imagename eq nginx.exe"

