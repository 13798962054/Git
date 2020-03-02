# 一、HTML

1、强制国产浏览器使用 **Chromium** 内核

```html
<meta name="renderer" content="webkit"/>
<meta name="force-rendering" content="webkit"/>
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
```



# 二、CSS

### 1、字体

1.1、字体间距

```css
letter-spacing:8px
```

1.2、段落抬头缩进

```css
text-indent:2em
```

1.3、英文首字母大小写

```css
/* 英文拼音的首字母大写 */
text-transform: capitalize;
/* 英文拼音字母全大写 */
text-transform: uppercase;
/* 英文拼音字母全小写 */
text-transform: lowercase;
```

### 2、z-index鼠标穿透

```html
pointer-events: none;
```

### 3、背景图片不滚动

```HTML
background-attachment:fixed
```

### 4、尺寸单位

```CSS
1vh = viewportHeight * 1/100; 
1vw = viewportWidth * 1/100; 
```



# 三、JS

## 1、设置网页可选中复制

```js
document.oncontextmenu=function(){return true;}; 

document.onselectstart=function(){return true;};
```

## 2、陌生函数

1、数组的some函数

2、数组的findIndex函数

3、数组的splice函数

# 四、JQuery

## *实用案例：

```json
// 圆形多选菜单选项
http://www.jq22.com/demo/jquery-circle-menu201807022349/
```

```JSON
// svg左侧导航栏特效
http://www.jq22.com/demo/svgNav201708020001/
```

```json
// json表格
http://www.jq22.com/demo/jquerytablePlugin201901132312/
```



# 五、AJAX

```HTML
<script src="js/jquery-3.3.1.min.js"></script>

<div id="myDiv"><h2>Let AJAX change this text</h2></div>
<button id="b01" type="button">Change Content</button>

<script>
	$(document).ready(function(){
		$("#b01").click(function(){
			htmlobj=$.ajax({url:"name.txt",async:false});
			$("#myDiv").html(htmlobj.responseText);
		});
	});
</script>
```
