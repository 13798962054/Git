# Vue.js

+ 核心概念：用户不再操作DOM元素，让前端程序员只需要考虑数据的业务逻辑
+ VM实例会监听自己身上data中所有数据的变化，会实时同步

## 一、入门

### 1、基本代码

```html
<!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<!-- 1、导入Vue的包 -->
	<script src="js/vue2.6.10.js"></script>
</head>
<body>

	<div id="app">
        <!-- 插值表达式 -->
		<p>{{ msg }}</p>
	</div>

</body>


<script type="text/javascript">
	// 2、创建一个Vue的实例
	// 当我们导入包后，在浏览器内存中，就多了一个Vue的构造函数

	var vm = new Vue({
		// el：element
		// #app 对应ID为app的元素
		el: "#app",
		// data存放el中药用到的数据
		data: {
			msg: "welcome"
		}
	})

</script>

</html>
```

## 二、指令

### 1、v-cloak

```html
<!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<!-- 1、导入Vue的包 -->
	<script src="js/vue2.6.10.js"></script>
	<style type="text/css">
		[v-cloak]{
			display: none;
		}
	</style>
</head>
<body>

	<div id="app">
		<!-- 插值表达式 -->
		<!-- 使用v-cloak能够解决差值表达式的闪烁问题 -->
		<p v-cloak>{{ msg }}</p>
	</div>

</body>


<script type="text/javascript">
	// 2、创建一个Vue的实例
	// 当我们导入包后，在浏览器内存中，就多了一个Vue的构造函数

	var vm = new Vue({
		// el：element
		// #app 对应ID为app的元素
		el: "#app",
		// data存放el中药用到的数据
		data: {
			msg: "welcome"
		}
	})

</script>

</html>
```

### 2、v-text

+ （没有闪烁问题，会覆盖原本的元素的内容）

```html
<!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<!-- 1、导入Vue的包 -->
	<script src="js/vue2.6.10.js"></script>

</head>
<body>

	<div id="app">
		<!-- 插值表达式 -->
		<!-- 默认v-text没有闪烁问题 -->
		<!-- 会覆盖原本的内容 -->
		<p v-text="msg">==============</p>
	</div>

</body>


<script type="text/javascript">
	// 2、创建一个Vue的实例
	// 当我们导入包后，在浏览器内存中，就多了一个Vue的构造函数

	var vm = new Vue({
		// el：element
		// #app 对应ID为app的元素
		el: "#app",
		// data存放el中药用到的数据
		data: {
			msg: "welcome"
		}
	})

</script>

</html>
```

### 3、v-html

+ 渲染数据为html，会覆盖原本元素中的内容

  ```html
  <!DOCTYPE html>
  <html>
  <head>
  	<title>demo1</title>
  	<!-- 1、导入Vue的包 -->
  	<script src="js/vue2.6.10.js"></script>
  
  </head>
  <body>
  
  	<div id="app">
  		<!-- 插值表达式 -->
  		<!-- 默认v-text没有闪烁问题 -->
  		<!-- 会覆盖原本的内容 -->
  		<p v-html="msg">==============</p>
  	</div>
  
  </body>
  
  
  <script type="text/javascript">
  	// 2、创建一个Vue的实例
  	// 当我们导入包后，在浏览器内存中，就多了一个Vue的构造函数
  
  	var vm = new Vue({
  		// el：element
  		// #app 对应ID为app的元素
  		el: "#app",
  		// data存放el中药用到的数据
  		data: {
  			msg: "<h1>welcome</h1>"
  		}
  	})
  
  </script>
  
  </html>
  ```

### 4、v-bind

+ v-bind: 是Vue中，提供的用于绑定属性的指令
+ 缩写是 :

```HTML
<!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<!-- 1、导入Vue的包 -->
	<script src="js/vue2.6.10.js"></script>
	<style type="text/css">
		[v-cloak]{
			display: none;
		}
	</style>
</head>
<body>

	<div id="app">
		<!-- 插值表达式 -->
		<!-- v-bind: 是Vue中，提供的用于绑定属性的指令 -->
		<!-- 变量可以作为字符串操作 -->
		<input type="button" name="" v-bind:value="myvalue + '123'" v-bind:title="mytitle">
		<!-- v-bind的简写 : -->
		<input type="button" name="" :value="myvalue">
	</div>

</body>


<script type="text/javascript">
	// 2、创建一个Vue的实例
	// 当我们导入包后，在浏览器内存中，就多了一个Vue的构造函数

	var vm = new Vue({
		// el：element
		// #app 对应ID为app的元素
		el: "#app",
		// data存放el中药用到的数据
		data: {
			myvalue: "button",
			mytitle: "this is a button"
		}
	})

</script>

</html>
```

### 5、v-on

+ 事件，缩写是 @

  ```html
  <!DOCTYPE html>
  <html>
  <head>
  	<title>demo1</title>
  	<!-- 1、导入Vue的包 -->
  	<script src="js/vue2.6.10.js"></script>
  	<style type="text/css">
  		[v-cloak]{
  			display: none;
  		}
  	</style>
  </head>
  <body>
  
  	<div id="app">
  		<!-- 插值表达式 -->
  		<input type="button" name="" :value="myvalue" v-on:click="show">
  	</div>
  
  </body>
  
  
  <script type="text/javascript">
  	// 2、创建一个Vue的实例
  	// 当我们导入包后，在浏览器内存中，就多了一个Vue的构造函数
  
  	var vm = new Vue({
  		// el：element
  		// #app 对应ID为app的元素
  		el: "#app",
  		// data存放el中药用到的数据
  		data: {
  			myvalue: "button",
  			mytitle: "this is a button"
  		},
  		// 定义Vue实例所可用的方法
  		methods:{
  			show: function(){
  				alert("hello")	
  			}
  			
  		}
  	})
  
  </script>
  
  </html>
  ```

#### 5.1事件修饰符

##### 5.1.1 .stop

+ 阻止冒泡

  ```html
  <!DOCTYPE html>
  <html>
  <head>
  	<title>事件修饰符</title>
  	<script src="js/vue2.6.10.js"></script>
  	<style type="text/css">
  		.inner{
  			width: 200px;
  			height: 200px;
  			background-color: #339920;
  		}
  	</style>
  </head>
  
  <body>
  	<div id="app">
  		<div class="inner" @click="divHandler">
  			<!-- 点击按钮会冒泡，先执行按钮点击事件，后执行div点击事件 -->
  			<input type="button" :value="bvalue" @click="buttonHandler">
  			<!--  -->
  			<input type="button" value="noBlue" @click.stop="buttonHandler">
  		</div>
  	</div>
  </body>
  
  <script type="text/javascript">
  	var vm = new Vue({
  		el: "#app",
  		data: {
  			bvalue: "click me",
  			innerMsg: "inner",
  			btMsg: "bt"
  		},
  		methods: {
  			divHandler(){
  				console.log(this.innerMsg)
  			},
  			buttonHandler(){
  				console.log(this.btMsg)
  			}
  		}
  	})
  
  
  </script>
  </html>
  ```

##### 5.1.2 .prevent

+ 阻止触发默认事件

```html
<!DOCTYPE html>
<html>
<head>
	<title>事件修饰符</title>
	<script src="js/vue2.6.10.js"></script>
</head>

<body>
	<div id="app">
		<!-- .prevent阻止默认事件，使该链接不能跳转 -->
		<a :href="link" @click.prevent="linkClick">有问题，找百度</a>
	</div>
</body>

<script type="text/javascript">
	var vm = new Vue({
		el: "#app",
		data: {
			link: "http://www.baidu.com"
		},
		methods: {
			linkClick(){
				alert("aa")
			}
		}
	})
</script>
</html>
```

##### 5.1.3 .capture

+ 捕获机制

```HTML
<!DOCTYPE html>
<html>
<head>
	<title>事件修饰符</title>
	<script src="js/vue2.6.10.js"></script>
	<style type="text/css">
		.inner{
			width: 200px;
			height: 200px;
			background-color: #339920;
		}
	</style>
</head>

<body>
	<div id="app">
		<!-- capture捕获机制，先执行capture的事件 -->
		<div class="inner" @click.capture="divHandler">
			<input type="button" :value="bvalue" @click="buttonHandler">

		</div>
	</div>
</body>

<script type="text/javascript">
	var vm = new Vue({
		el: "#app",
		data: {
			bvalue: "click me",
			innerMsg: "inner",
			btMsg: "bt"
		},
		methods: {
			divHandler(){
				console.log(this.innerMsg)
			},
			buttonHandler(){
				console.log(this.btMsg)
			}
		}
	})
</script>
</html>
```

##### 5.1.4 .self

+ 只有点击当前元素，才会触发函数

```html
<!DOCTYPE html>
<html>
<head>
	<title>事件修饰符</title>
	<script src="js/vue2.6.10.js"></script>
	<style type="text/css">
		.inner{
			width: 200px;
			height: 200px;
			background-color: #339920;
		}
	</style>
</head>

<body>
	<div id="app">
		<!-- 只有点击当前元素，才会触发函数 -->
		<div class="inner" @click.self="divHandler">
			<input type="button" :value="bvalue" @click="buttonHandler">

		</div>
	</div>
</body>

<script type="text/javascript">
	var vm = new Vue({
		el: "#app",
		data: {
			bvalue: "click me",
			innerMsg: "inner",
			btMsg: "bt"
		},
		methods: {
			divHandler(){
				console.log(this.innerMsg)
			},
			buttonHandler(){
				console.log(this.btMsg)
			}
		}
	})
</script>
</html>
```

##### 5.1.5 .once

+ 事件只触发一次

### 6、v-model 数据的双向绑定

+ 只能御用在表单元素中：
  - input(text, radio, email ... ) , select, checkbox , textarea

```html
<!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<!-- 1、导入Vue的包 -->
	<script src="js/vue2.6.10.js"></script>

</head>
<body>
	<div id="app">
		<input type="text" v-model="msg">
	</div>
</body>
<script type="text/javascript">
	var vm = new Vue({
		el: "#app",
		data: {
			msg: "welcome"
		}
	})
</script>

</html>
```

### 7、v-for

+  v-for迭代数组
+ v-for迭代对象
+ v-for迭代数字
+ v-for迭代数组对象

+ 在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果v-for有问题，必须在使用v-for的同时，指定唯一的字符串/数字类型 :key 值

```html
<p v-for="item in list" :key="item.id">
    <input type="checkbox">{{item.id}} --- {{item.name}}
</p>
```

### 8、v-if & v-show

+ v-if：每次都会重新删除或创建元素，有较高的切换性能消耗 
+ v-show：切换display:none的样式，有较高的初始渲染消耗

```HTML
 <!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<script src="js/vue2.6.10.js"></script>
	
</head>
<body>

	<div id="app">
		<button @click="flag = !flag">show & hide</button>
		<!-- v-if：每次都会重新删除或创建元素，有较高的切换性能消耗 -->
		<p v-if="flag">test-if</p>
		<!-- v-show：切换display:none的样式，有较高的初始渲染消耗 -->
		<p v-show="flag">test-show</p>
	</div>

</body>


<script type="text/javascript">

	var vm = new Vue({
		el: "#app",
		data: {
			flag: false
		}
	})

</script>

</html>
```



## 三、绑定和改变元素样式

### 1、通过元素绑定设置class类样式

```html
<!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<script src="js/vue2.6.10.js"></script>
	<style type="text/css">
		.red{
			color: red;
		}

		.thin{
			font-weight: 200;
		}

		.italic{
			font-weight: 200;
		}

		.active{
			letter-spacing: 0.5em;
		}
	</style>
</head>
<body>

	<div id="app">
		<!-- 第一种，直接传递一个数组，这里的class需要使用v-bind做数组绑定-->
		<h1 :class="['red', 'thin']">very big title</h1>
		<!-- 第二种，在数组中使用三元表达式-->
		<h1 :class="[flag ? 'active' : '']">very big title</h1>
		<!-- 第三种，在数组中使用对象来代替三元表达式，提高代码的可读性-->
		<h1 :class="['red', 'thin', {'active': flag}]">very big title</h1>
		<!-- 第四种，直接使用对象 -->
		<h1 :class="{red:true, thin:true, italic:false}">very big title</h1>
		<!-- 拓展：属性的引用 -->
		<h1 :class="classObj">very big title</h1>
	</div>

</body>


<script type="text/javascript">

	var vm = new Vue({
		el: "#app",
		data: {
			flag: true,
			classObj: {red:true, thin:true, italic:false}
		}
	})

</script>

</html>
```

### 2、绑定内联style

```html
 <!DOCTYPE html>
<html>
<head>
	<title>demo1</title>
	<script src="js/vue2.6.10.js"></script>
	
</head>
<body>

	<div id="app">
		<!-- 第一种，对象形式 -->
		<!-- 如果属性名中带有-，则必须要带引号 -->
		<h1 :style="{ color:'red', 'font-weight':1000 }">this is h1</h1>
		<!-- 第二种，使用数组 -->
		<h1 :style="[styleObj1, styleObj2]">this is h1</h1>
	</div>

</body>


<script type="text/javascript">

	var vm = new Vue({
		el: "#app",
		data: {
			styleObj1: { color: "red", 'font-weight': 200 },
			styleObj2: { 'font-style': 'italic' }
		}
	})

</script>

</html>
```

## 四、[devtools](https://chrome.google.com/webstore/detail/vue.js-devtools/nhdogjmejiglipccpnnnanhbledajbpd?h1=zh-CN)

## 五、过滤器

+ 过滤器调用的时候，采用就近原则，优先调用私有过滤器

+ 格式：（全局过滤器）
+ - Vue.filter("name", function (msg) {}

```html
<!DOCTYPE html>
<html>
<head>
	<title>过滤器</title>
	<script src="../js/vue2.6.10.js"></script>
</head>
<body>

	<div id="app">
		<p>{{ msg | msgFormat('crazy') | msgFormat2 }}</p>
	</div>


</body>

<script type="text/javascript">
	
	Vue.filter("msgFormat", function (msg, arg) {
		// 字符串的replace方法， 第一个参数，除了可以写一个字符串以外，还可以定义一个正则
		// /g全局匹配
		// return msg.replace(/naive/g, 'evil')
		return msg.replace(/naive/g, arg)
	})

	Vue.filter("msgFormat2", function(msg){
		return msg + ".The end."
	})


	var vm = new Vue({
		el: "#app",
		data: {
			msg: "i use to be naive, ask who is the most naive person around the world"
		},
		methods: {

		}
	})

</script>
</html>
```

+ 格式（私有过滤器）

+ - ```JS
    filters: {
        strFilter(str){
            return str + "app"
        }
    }
    ```

    

## 六、监听键盘事件

系统自带按键别名：

+ .enter
+ .tab
+ .delete（捕获”删除“和”退格“键）
+ .esc
+ .space
+ .up
+ .down
+ .left
+ .right
+ .键盘码

自定义别名：

+ 可以通过全局config.keyCodes对象自定义键值修饰符别名：

```js
Vue.config,keyCodes.f2 = 113
```



## *结合Layui实现三级树列菜单

```html
<ul class="layui-nav layui-nav-tree nav" lay-filter="test">
        <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
        <li class="layui-nav-item" v-for="(first, i) in Nav1" :key="first.id">
            <a href="javascript:;">{{first}}</a>
            <dd class="layui-nav-child" v-for="(second, j) in Nav2[i]" :key="second.id">
                <a href="javascript:;"  @click="showContent(i, j, k)">{{second}}</a>
                <dl class="layui-nav-child" v-for="(third, k) in Nav3[i][j]" :key="third.id" @click="showContent(i, j, k)">
                    <dd><a href="javascript:;">{{third}}</a></dd>
                </dl>
            </dd>
        </li>
    </ul>
```

