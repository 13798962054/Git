# Laravel框架

## 一：[框架搭建](<https://blog.csdn.net/weixin_34092370/article/details/92677905>)

1、安装composer

curl -sS https://getcomposer.org/installer | php

2、创建laravel项目

```bat
composer config -g repo.packagist composer https://packagist.phpcomposer.com
composer create-project laravel/laravel larave

cd ./laravel
composer install
```

2.*：composer创建项目

```bat
composer create-project laravel/laravel learnlaravel5 ^5.5
```

3、运行

```bat
cd /public
php -S 0.0.0.0:1024
```

## 二：链接数据库

1、创建一个控制器

```BAT
php artisan make:controller API\UserController
```

2、编写这个控制器

```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * @param $id
     * 测试数据库的查询功能
     */
    public function getUser(){
        $users = DB::select("select * from user");
        return response() -> json([
            "status" => true,
            "result" => $users,
        ]);
    }
}

```

3、编写路由

```php
/**
 * 测试数据库连接
 * 请求地址，Controller所在地址 @方法名
 */
Route::get("/getUser", "API\UserController@getUser");
```

4、其他操作

* 增

```php
DB::insert('insert into user (username, password) values (?, ?)', ['pikachu', '334455']);
```

* 删

```php
// 会返回受影响的行数
$rows = DB::delete('delete from user where id = ?', [3]);
```

* 改

```php
// 会返回受影响的行数
$rows = DB::update('update user set password = ? where id = ?', ['222', 2]);
```

* 删除整个表

```php
DB::statement('drop table user');
```

### *、增删改查

```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * 测试数据库的查询功能
     *
     */
    public function getUser(){
        // 方法一：
//        $user = DB::select("select * from user");
//        return response() -> json([
//            "status" => true,
//            "result" => $user,
//        ]);
        // 方法二：返回collection结果集
        $db = DB::table("user");
        // 查询全部的数据
        $data = $db -> get();
        // 循环数据，value是对象
        foreach($data as $key => $value){
//            dd($value);
            echo("id：{$value -> id}，username：{$value -> username}，password：{$value -> password} <br />");
        }
//        dd($data);

        // 条件查询，交集
//        $data2 = $db -> where("id", ">", "2") -> orwhere("id", "<", "5") -> get();
//        dd($data2);

        // 方法三：取出单行数据
//        $data3 = $db -> first();
//        dd($data3);

        // 取出某个具体的值
//        $data4 = $db -> value("username");
//        dd($data4);

        // 获取某些字段
//        $data5 = $db -> select("id", "username") -> get();
//        dd($data5);

        // 排序操作（降序）
//        $data6 = $db -> orderBy("id", "desc") -> get();
//        dd($data6);

        // 分页（限制输出结果数）
        // limit：表示限制输出的条数
        // offset：从什么地方开始
        $data7 = $db -> limit(3) -> offset(3) -> get();
        dd($data7);

    }

    /**
     * 测试数据库的增加功能
     * insert()插入多条数据
     * insertGetId()插入一条数据返回ID
     */
    public function addUser(){
        // 定义关联的表
        $user = DB::table("user");
        // 二维数组方式插入多条数据
        $user -> insert([
            [
                'username' => "马冬梅",
                "password" => "123"
            ],
            [
                "username" => "奥巴马",
                "password" => "123"
            ],
            [
                "username" => "老老",
                "password" => "123"
            ]

        ]);

        // 插入一条sql并返回id值
        $result = $user -> insertGetId([
            "username" => "马春梅",
            "password" => "123"
        ]);
        dd($result);
    }

    /**
     * 测试数据库的更新功能
     * 返回收到影响的行数
     * update修改所有字段
     * increment & decrement修改数值字段
     */
    public function updateUser(){
        $user = db::table("user");
        $result = $user -> where("id", "4") -> update([
           "username"  => "修改"
        ]);

        dd($result);
    }

    /**
     * 测试数据库的删除功能
     * Delete表示删除记录
     * Truncate表示清空整个数据表
     * 删除数据分为物理删除（本质是删除）、逻辑删除（本质是修改）
     */
    public function deleteUser(){
        $user = db::table("user");

        // 删除id为1 的记录
        $result = $user -> where("id", "<", "3") -> delete();

        dd($result);
    }

}

```



### 5、数据库的事务

1、在 **transaction** 闭包中的任何异常都会导致事务自动回滚：

```php
DB::transaction(function()
{
    DB::update('update user set password = ? where id = ?', ['23', 2]);
    DB::delete('delete from user where id = ?', [3]);
});
```

2、我们也可以手动控制事务的开启、回滚、提交：

```php
// 开启事务
DB::beginTransaction(); 
// 回滚事务
DB::rollback(); 
// 提交事务
DB::commit();
```

## 三：视图层语法

### 1、循环体

```php
id&emsp;&emsp;username&emsp;&emsp;password&emsp;&emsp;<br />
@foreach($data as $key => $val)
    {{$val -> id}}&emsp;&emsp;{{$val -> username}}&emsp;&emsp;{{$val -> password}}<br />
@endforeach
```

### 2、条件语句

```php
@if(1 > 3)
    1 > 3
@elseif(3 > 1)
    3 > 1
@endif
```

## 四、CSRF验证

- 在laravel中是默认开启的
- 异步提交表单时，只能用csrf_token()的形式

1、视图层写法

```php
{{--  通过隐藏域添加CSRF认证  --}}
<input type="hidden" name="_token" value="{{csrf_token()}}">
{{--  表单添加CSRF简写  --}}
{{ csrf_field() }}
```

2、csrf白名单：

- 位于App\Http\Middleware

- 写法：

- ```php
  protected $except = [
      // 该处写排除csrf验证的路由
      // 通配符(匹配所有路由)  
      "*"
  ];
  ```





## *：Laravel常用函数

### 1、dd

dd函数用来打印出给定的变量和**结束脚本的运行**，如果不想结束脚本运行，请使用dump函数。

## *：php常用函数

### 1、时间

```php
// 获取当前时间戳
$time = time();
// 获取一年后的时间戳
$time_after_year = strtotime('+1 year');
// 格式化时间戳
date('Y-m-d H-i-s', $time_after_year)
// 获取今天的星期数字
$day = date("N");
```

### 2、compact（打包数组）

```PHP
view("home/testView", compact("date", "day", "time_after_year"));
```

```php
$firstname = "Bill";
$lastname = "Gates";
$age = "60";
$rr = compact("firstname", "lastname", "age");
dump($rr);
```

## *HTML常用语法

1、特殊转义字符 

```html
&emsp; => \t
&nbsp; => spacing
&copy; => ©
```

