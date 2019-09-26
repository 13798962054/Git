1、批量改后缀名

```bat
ren *.pps *ppt
```

2、批量相同后缀名重命名

```bat
@echo off   
set a=0
setlocal EnableDelayedExpansion   
for %%n in (*.jpg) do ( 
	set /A a+=1   
	ren "%%n" "single-product!a!.jpg"   
)  
```

