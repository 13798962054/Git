# ES6.0

+ 全称：ECMAScript6.0

+ 兼容性： IE10+

## 1、变量

var的缺点：

- 可以重复声明
- 无法限时修改（无常量）
- 没有块级作用域
  - 只认函数作用域

let和const的优点：

+ 不能重复声明
+ 块级作用域

let和const的区别：

+ let是变量，const是常量

## 2、函数

箭头函数：

+ 如果只有一个参数，()可以省
+ 如果只有一个return，{}可以省

函数的参数：

+ 参数扩展/展开

  - function name(a, b, ...args)

  - 收集剩余的参数

  - 展开：

  - ```js
    function show(a, b, ...args){
    		console.log(a)
    		console.log(b)
    		console.log(args)
    	}
    
    	// show(1, 2, 3, 4, 5)
    
    	array = [1, 2, 3, 4, 5, 6]
    	show(...array)
    
    	array2 = [32, 31, 20]
    	
    	array3 = [...array, ...array2]
    	// 1, 2, 3, 4, 5, 6, 32, 31, 20 
    	console.log(array3)
    ```

+ 默认参数

```js
function show(a=1, b, c=3){
	console.log(a, b, c)
}
show(20, 30)
```

## 3、字符串

1、string.prototype.includes('要包含的字符串')

+ 返回true/false
+ - 对一个JQuery中的$(':contains("要包含的字符串")')

2、字符串的填充

+ 头部填充：String.prototype.padStart(maxLength, fillString="")
+ 尾部填充：String.prototype.padEnd(maxLength, fillString="")















