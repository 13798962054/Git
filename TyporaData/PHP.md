## *常见问题

> 输出数组和集合时用print_r()
>
> > 如果使用echo()只能得到Array

## *盲区

1、逻辑运算符

```php
// 当：x||y为真，并且x&&y为假时，结果为真
$x xor $y
```





## 1、php接收post请求的数据

### 1.1发送页面  query.php

```html
<input type="text" name="domain" id="textfield"/>
```

### 1.2PSOT的接受页面   query_do.php  就是 

```php
<?php $domain=$_POST['domain']; echo $domain;?>
```

### 1.3阻止post跳转并返回结果

index.html：

```html

<form id="contact-form" action="action.php" method="post">
    <div class="row">
        <div class="col-md-6">
            <div class="contact-form-style mb-20">
                <input name="name" placeholder="姓名" type="text">
            </div>
        </div>
        <div class="col-md-6">
            <div class="contact-form-style mb-20">
                <input name="email" placeholder="邮箱*" type="email">
            </div>
        </div>
        <div class="col-md-12">
            <div class="contact-form-style form-style-2">
                <textarea name="message" placeholder="内容"></textarea>
                <button class="form-button btn-style-2" type="submit"><span>提交</span></button>
            </div>
        </div>
    </div>
</form>
<p class="form-messege"></p>


<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/plugins.js"></script>
```

action.php：

```php
返回成功
```

plugin.js：

```js

// Place any jQuery/helper plugins in here.
/*---------------------------------
    ajax-mail.js
-----------------------------------*/
$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-messege');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});

});

```

## 2、数据库

### 2.1连接数据库

#### 2.1.1PDO

> PHP 数据对象 （PDO） 扩展为PHP访问数据库定义了一个轻量级的一致接口。
>
> PDO 提供了一个数据访问抽象层，这意味着，不管使用哪种数据库，都可以用相同的函数（方法）来查询和获取数据。

## 3、local、global变量

1、local接收global变量报错

```php
<?php
    $name = "David"
    function getName(){
    	echo $name;
	}
	getName()
    //error: Undefined variable: name 
}
```

解决方案：

```php
<?php
    $name = "David"
    function getName(){
    	global $name;
    	echo $name;
	}
	getName()
    //Outputs 'David'
}

```

3、Variable Variables

```php
<?php
$hi = "sam";
$a = "hello";
$hello = "hi";
echo($$$a);
// Output: sam
```

