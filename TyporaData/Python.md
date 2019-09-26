## 一、帮助文档

[Tkinter](<https://blog.csdn.net/Fighting_Boom/article/details/81268074>)

[web.py](<https://blog.csdn.net/freeking101/article/details/53020865>)

## 二、PYQT5

### 1、Printer

```python
from PyQt5.QtGui import QFont,QTextDocument,QTextCursor
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QSizePolicy, QAction,QDialog
from PyQt5.QtPrintSupport import QPrinter, QPrintDialog,QPrintPreviewDialog
import sys

the_text = """
《描写雪的诗句》赏析
不知庭霰今朝落，疑是林花昨夜开《苑中遇雪》
忽如一夜春风来，千树万树梨花开《白雪歌送武》
白雪却嫌春色晚，故穿庭树作飞花《春雪》
雪似梅花，梅花似雪。似和不似都奇绝《踏莎行》
千峰笋石千株玉，万树松萝万朵银《南秦雪》
六出飞花入户时，坐看青竹变琼枝《对雪》
地白风色寒，雪花大如手《嘲王历阳不肯饮酒》
燕山雪花大如席，片片吹落轩辕台《北风行》
白雪纷纷何所似？撒盐空中差可拟《咏雪联句》
才见岭头云似盖，已惊岩下雪如尘《南秦雪》
"""
class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        self.setWindowTitle("打印功能")

​```
    # 创建文本框
    self.label = QLabel()
    self.label.setFont(QFont("Roman times",12,QFont.Bold))
    self.label.setText(the_text)
    self.setCentralWidget(self.label)
​```

​```
    # 创建菜单栏
    self.createMenus()
​```



​```
def createMenus(self):
    # 创建动作一
    self.printAction1 = QAction(self.tr("打印无预留"), self)
    self.printAction1.triggered.connect(self.on_printAction1_triggered)

    # 创建动作二
    self.printAction2 = QAction(self.tr("打印有预留"), self)
    self.printAction2.triggered.connect(self.on_printAction2_triggered)

    # 创建动作三
    self.printAction3 = QAction(self.tr("直接打印"), self)
    self.printAction3.triggered.connect(self.on_printAction3_triggered)

    # 创建动作四
    self.printAction4 = QAction(self.tr("打印到PDF"), self)
    self.printAction4.triggered.connect(self.on_printAction4_triggered)
​```

​```
    # 创建菜单，添加动作
    self.printMenu = self.menuBar().addMenu(self.tr("打印"))
    self.printMenu.addAction(self.printAction1)
    self.printMenu.addAction(self.printAction2)
    self.printMenu.addAction(self.printAction3)
    self.printMenu.addAction(self.printAction4)
​```



​```
# 动作一：打印，无预览
def on_printAction1_triggered(self):
    printer = QPrinter()
    printDialog = QPrintDialog(printer, self)
    if printDialog.exec_() == QDialog.Accepted:
        self.handlePaintRequest(printer)
​```

​```
# 动作二：打印，有预览
def on_printAction2_triggered(self):
    dialog = QPrintPreviewDialog()
    dialog.paintRequested.connect(self.handlePaintRequest)
    dialog.exec_()
​```

​```
# 动作三：直接打印
def on_printAction3_triggered(self):
    printer = QPrinter()
    self.handlePaintRequest(printer)
​```

​```
# 动作四：打印到pdf
def on_printAction4_triggered(self):
    printer = QPrinter()
    printer.setOutputFormat(QPrinter.PdfFormat)
    printer.setOutputFileName("D:/pdf打印测试.pdf")
    self.handlePaintRequest(printer)
​```

​```
## 打印函数
def handlePaintRequest(self, printer):
    document = QTextDocument()
    cursor = QTextCursor(document)
    cursor.insertText(self.label.text())
    document.print(printer)
​```

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main = MainWindow()
    main.show()
    sys.exit(app.exec_())
```

### 2、菜单栏&子菜单

```python
import sys
from PyQt5.QtWidgets import QMainWindow, QAction, QMenu, QApplication


class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        # 菜单栏
        menubar = self.menuBar()
        # 一级菜单
        fileMenu = menubar.addMenu('File')
        # 二级菜单
        impMenu = QMenu('Import', self)
        # 三级菜单
        impAct = QAction('Import mail', self)
        # 添加三级菜单
        impMenu.addAction(impAct)

        newAct = QAction('New', self)
        # 添加二级菜单
        fileMenu.addAction(newAct)
        fileMenu.addMenu(impMenu)

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Submenu')
        self.show()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())
```

### 3、右键菜单栏

```python
import sys
from PyQt5.QtWidgets import QMainWindow, qApp, QMenu, QApplication
class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Context menu')
        self.show()

    def contextMenuEvent(self, event):
        cmenu = QMenu(self)

        # 添加右键菜单
        newAct = cmenu.addAction("New")
        opnAct = cmenu.addAction("Open")
        quitAct = cmenu.addAction("Quit")
        action = cmenu.exec_(self.mapToGlobal(event.pos()))
        # 右键菜单栏事件
        if action == quitAct:
            qApp.quit()
            
if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())
```

### 4、.setFocusPolicy聚焦策略

```PYTHON
Qt.TabFocus	 接受Tab键焦点

Qt.ClickFocus    接受鼠标单击做焦点

Qt.StrongFocus	TabFocus | ClickFocus	接受Tab键和鼠标单击做焦点

Qt.WheelFocus	StrongFocus	 滑轮作为焦点选中事件

Qt.NoFocus	不接受焦点
```

### 5、子窗口阻塞

```python
self.projectSetting = ProjectSetting(self)
# 阻塞，子窗口置顶并且不关闭子窗口就无法操作父窗口（必须放在show()前面）
self.projectSetting.setWindowModality(Qt.ApplicationModal)
self.projectSetting.show()
# 显示模式对话框，不关闭此对话框，不能执行别的操作。
self.projectSetting.exec_()
```

### 6、键盘事件

```python
# 键盘监听事件
def keyPressEvent(self, QKeyEvent):
	print(QKeyEvent)
```

```python
item = QLineEdit("")
table.setCellWidget(j, i, item)
arrayTemp = [i, j]
 # 表格中输入框监听enter事件
item.returnPressed.connect(lambda: self.itemEnterEvent(arrayTemp))
    
# 表格中输入框监听enter事件
def itemEnterEvent(self, array):
	i = array[0]
    j = array[1]
    # 设置下一个OD表格聚焦
    # j = 29时，到底换下一列
    if j == 29:
        self.mainTable.cellWidget(1, i+1).setFocus()
	else:
        # 让表单的某一个格子获取焦点
		self.mainTable.cellWidget(j+4, i).setFocus()
```



## 三、openpyxl，excel包

```PYTHON

# 创建空白excel文件
# wb = Workbook()
# 选中第一个sheet
# ws = wb.worksheets[0]

# 打开excel文件
wb = openpyxl.load_workbook('data.xlsx')
# 选定表格
ws = wb["data"]
# 删除sheet
wb.remove(ws)
# 新建一个sheet
ws=wb.create_sheet('data',2)
# 设置列宽
ws.column_dimensions['B'].width = 65.75
```



```PYTHON
line = [delString(a[0].string), delString(a[1].string), delString(right[0].get_text())]
 # 写入
ws.append(line)
```



```python
# 保存excel文件
wb.save("data.xlsx")
```



## 四、爬虫

### 1、招标网站

```PYTHON
from bs4 import BeautifulSoup
from lxml import html
import xml
import requests
from openpyxl import Workbook
import openpyxl
# 定义爬取n页
n = 10

# 打开excel文件
wb = openpyxl.load_workbook('data.xlsx')
# 选定表格
ws = wb["data"]
# 删除sheet
wb.remove(ws)
# 新建一个sheet
ws=wb.create_sheet('data',2)
# 设置列宽
ws.column_dimensions['B'].width = 65.75

# 去除多余
def delString(a):
    return a.replace(" ","").replace("\r","").replace("\n","")

# 爬取n页
for k in range(n):
    url = "https://www.bidcenter.com.cn/zbpage-1-" + str(k) + ".html"
    f = requests.get(url)
    soup = BeautifulSoup(f.content, "lxml")
    print("正在爬取第" + str(k+1) + "页")
    for k in soup.find_all(id="searchcontent"):
        # print(k)
        for li in k.find_all('li'):
            for left in li.find_all('div', class_="s_c_l_left"):
                a = left.find_all('a')
                right = li.find_all('div', class_="s_c_l_right")

                line = [delString(a[0].string), delString(a[1].string), delString(right[0].get_text())]
                # 写入
                ws.append(line)


# 保存excel文件
wb.save("data.xlsx")

```

### 2、selenium

#### 1、chrome的webdriver

下载对应的webdriver  （这里没有可以自己推测每3个版本，对应一个v65-67---v2.38,即v68-70--v2.39）

下载地址：<http://chromedriver.storage.googleapis.com/index.html>

把下载好的chromedriver.exe，解压后放到python36目录下（或者python36目录下的scripts） 

#### 2、打开浏览器

from selenium import webdriver
from pyquery import PyQuery
browser = webdriver.Chrome()

#### 3、chrome驱动

<http://npm.taobao.org/mirrors/chromedriver/>

####  4、ActionChains模拟人工鼠标滑动

```python
# 开始移动
def start_move(distance):
    element = browser.find_element_by_id("nc_1_n1z")

    # 这里就是根据移动进行调试，计算出来的位置不是百分百正确的，加上一点偏移
    distance -= element.size.get('width') / 2
    distance += 50

    # 按下鼠标左键
    ActionChains(browser).click_and_hold(element).perform()
    time.sleep(0.5)
    while distance > 0:
        if distance > 10:
            # 如果距离大于10，就让他移动快一点
            span = random.randint(5, 8)
        else:
            # 快到缺口了，就移动慢一点
            span = random.randint(2, 3)
        ActionChains(browser).move_by_offset(span, 0).perform()
        distance -= span
        # time.sleep(random.randint(10, 50) / 100)
        time.sleep(0.01)
    ActionChains(browser).move_by_offset(distance, 1).perform()
    ActionChains(browser).release(on_element=element).perform()
```

## 五、STMP

ID：jfowen1288@163.com

PWD：virion123

### 1、发送文本

```python
import smtplib
from email.mime.text import MIMEText
#设置服务器所需信息
#163邮箱服务器地址
mail_host = 'smtp.163.com'
#163用户名
mail_user = 'jfowen1288@163.com'
#密码(部分邮箱为授权码)
mail_pass = 'virion123'
#邮件发送方邮箱地址
sender = 'jfowen1288@163.com'
#邮件接受方邮箱地址，注意需要[]包裹，这意味着你可以写多个邮件地址群发
receivers = ['jfowen1288@qq.com']

#设置email信息
#邮件内容设置
message = MIMEText('content','plain','utf-8')
#邮件主题
message['Subject'] = 'title'
#发送方信息
message['From'] = sender
#接受方信息
message['To'] = receivers[0]

#登录并发送邮件
try:
    smtpObj = smtplib.SMTP()
    #连接到服务器
    smtpObj.connect(mail_host,25)
    #登录到服务器
    smtpObj.login(mail_user,mail_pass) 
    #发送
    smtpObj.sendmail(sender,receivers,message.as_string())
    #退出
    smtpObj.quit()
    print('success')
except smtplib.SMTPException as e:
    print('error',e) #打印错误
```

### 2、发送文件

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

#设置登录及服务器信息
mail_host = 'smtp.163.com'
mail_user = 'jfowen1288@qq.com'
mail_pass = 'virion123'
sender = 'jfowen1288@163.com'
receivers = ['jfowen1288@qq.com']

#设置eamil信息
#添加一个MIMEmultipart类，处理正文及附件
message = MIMEMultipart()
message['From'] = sender
message['To'] = receivers[0]
message['Subject'] = 'title'
#推荐使用html格式的正文内容，这样比较灵活，可以附加图片地址，调整格式等
with open('abc.html','r') as f:
    content = f.read()
#设置html格式参数
part1 = MIMEText(content,'html','utf-8')
#添加一个txt文本附件
with open('abc.txt','r')as h:
    content2 = h.read()
#设置txt参数
part2 = MIMEText(content2,'plain','utf-8')
#附件设置内容类型，方便起见，设置为二进制流
part2['Content-Type'] = 'application/octet-stream'
#设置附件头，添加文件名
part2['Content-Disposition'] = 'attachment;filename="abc.txt"'
#添加照片附件
with open('1.png','rb')as fp:
    picture = MIMEImage(fp.read())
    #与txt文件设置相似
    picture['Content-Type'] = 'application/octet-stream'
    picture['Content-Disposition'] = 'attachment;filename="1.png"'
#将内容附加到邮件主体中
message.attach(part1)
message.attach(part2)
message.attach(picture)

#登录并发送
try:
    smtpObj = smtplib.SMTP()
    smtpObj.connect(mail_host,25)
    smtpObj.login(mail_user,mail_pass)
    smtpObj.sendmail(
        sender,receivers,message.as_string())
    print('success')
    smtpObj.quit()
except smtplib.SMTPException as e:
    print('error',e)
```

## 六、读写配置文件

### 1、配置文件

```ini
[config]
session=12541054005
```

### 2、读取配置文件

1、简单版

```python
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

print(config.get("config", "session"))
```

2、去bug版

```PYTHON
import os, sys
from configparser import ConfigParser

session = r''
# 读取配置文件
def ReadConfig():
    global session
    cfg = ConfigParser()
    cfgFile = 'config.ini'
    if not os.path.exists(cfgFile):
        input(cfgFile + ' not found')
        sys.exit(-1)
    with open(cfgFile, mode='rb') as f:
        content = f.read()
    if content.startswith(b'\xef\xbb\xbf'):  # 去掉 utf8 bom 头
        content = content[3:]
    cfg.read_string(content.decode('utf8'))
    if not cfg.sections():
        input('Read config.ini failed...')
        sys.exit(-1)

    SrcRoot = cfg.get('config', 'session').strip()
    print(SrcRoot)

if __name__ == '__main__':
    ReadConfig()
```

### 3、更改配置文件

1、简单版

```python
# 改变ini配置文件的属性值
config.set("config", "session", "change")

#由于ini文件中可能有同名项，所以做了异常处理
try:
    # 为配置文件添加节点School
    config.add_section("School")
    # 为节点添加键值对
    config.set("Match","IP","172.17.29.120")
except configparser.DuplicateSectionError:
    print("Section 'school' already exists")

# 写入并保存配置文件
config.write(open("config.ini", "w"))
```

### *模块常用函数：

1、读取配置文件

```python
# 直接读取ini文件内容
read(filename) 
# 得到所有的section，并以列表的形式返回
sections() 
# 得到该section的所有option
options(section) 
# 得到该section的所有键值对
items(section) 
# 得到section中option的值，返回为string类型
get(section,option) 
# 得到section中option的值，返回为int类型，还有相应的getboolean()和getfloat() 函数。
getint(section,option) 
```

2、写入配置文件

```python
# 添加一个新的section
add_section(section) 
# 对section中的option进行设置，需要调用write将内容写入配置文件。
set( section, option, value)
```

*解决中文乱码问题

```python
# 修改字符码为utf-8
config.read("setting.ini", encoding="utf-8")
file = open("setting.ini", encoding="utf-8", errors="ignore", mode="w")
```



## 七、菜单栏

```python
# 设置菜单栏
menubar = self.menuBar()
# 一级菜单
fileMenu = menubar.addMenu('文件')
# 二级菜单
settingAct = QAction('设置', self)
# 为菜单添加事件
settingAct.triggered.connect(lambda: self.projectSettingButtonEvent("RUBELLA"))
printAct = QAction('打印', self)
# 添加二级菜单
fileMenu.addAction(settingAct)
fileMenu.addAction(printAct)
```

## 八、FigureCanvasQTAgg画图

### demo：

```python
from pylab import *
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg
class Draw(FigureCanvasQTAgg):
    def __init__(self, parent=None, width=5, height=4, dpi=100):
        fig = Figure(figsize=(width, height), dpi=dpi)
        FigureCanvasQTAgg.__init__(self, fig)

        self.setParent(parent)
        self.plot()

    def plot(self):
        # 绘制Evaluation的图
        self.axEvaluation = self.figure.add_subplot(1,1,1)
        self.axEvaluation.set_title('Target Value Evaluation')
        # 坐标轴范围
        self.axEvaluation.set_ylim(0, 25)
        self.axEvaluation.set_xlim(0, 30)
        # 背景颜色
        # 画线
        x = [0, 30]
        y = [0, 0]
        self.axEvaluation.plot(x, y)
# 构建显示窗口     
from PyQt5 import *
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from PyQt5.QtPrintSupport import *
from PyQt5.QtWidgets import QDialog
import sys

class Main(QDialog):
    def __init__(self):
        super().__init__()
        self.resize(880, 500)
        self.m = Draw(self, width=9, height=3)
        self.m.move(-50, 20)


app = QApplication(sys.argv)
main = Main()
main.show()
main.exec_()
app.exit()
```

### 基本语法

*画图选项表

| 线型 | 说明         | 标记符 | 说明     | 颜色 | 说明   |
| ---- | ------------ | ------ | -------- | ---- | ------ |
| -    | 实线（默认） | +      | 加号符   | r    | 红色   |
| --   | 双划线       | o      | 空心圆   | g    | 绿色   |
| :    | 虚线         | *      | 星号     | b    | 蓝色   |
| :.   | 点划线       | .      | 实心圆   | c    | 青绿色 |
|      |              | x      | 叉号符   | m    | 洋红色 |
|      |              | s      | 正方形   | y    | 黄色   |
|      |              | d      | 菱形     | k    | 黑色   |
|      |              | ^      | 上三角形 | w    | 白色   |
|      |              | v      | 下三角形 |      |        |
|      |              | >      | 右三角形 |      |        |
|      |              | <      | 左三角形 |      |        |
|      |              | p      | 五角星   |      |        |
|      |              | h      | 六边形   |      |        |

1、画线

```python
x = [0, 30]
y = [0, 0]
self.axEvaluation.plot(x, y)
```

2、画点

```python
x = [0, 30]
y = [0, 0]
'''
r表示红色
.表示点的样子
'''
self.axEvaluation.plot(x, y, "r.")
# 或者
# self.axEvaluation.plot(x, y, "k*")
```

## 九、



## 十、字符&字符串操作

### 1、字符串分割

1、 **str.split()**：字符串分割函数 
　　通过指定分隔符对字符串进行切片，并返回分割后的字符串列表。 
　　语法： 
　　str.split(s, num)[n] 
　　参数说明： 
　　s：表示指定的分隔符，不写的话，默认是空格(’ ‘)。如果字符串中没有给定的分隔符时，则把整个字符串作为列表的一个元素返回。 
　　num：表示分割次数。如果指定了参数num，就会将字符串分割成num+1个子字符串，并且每一个子字符串可以赋给新的变量。 
　　[n]：表示选取第n个分片，n表示返回的list中元素下标，从0开始的。

2、 **os.path.split()**：路径文件分割函数 
　　按照路径将文件名和路劲分割开，这里需要引入os包(import os)。 
　　语法： 
　　os.path.split(‘PATH’) 
　　参数说明： 
　　PATH指一个文件所在的绝对路径

　　实例： 

1）split()函数常用的一些实例 

```python
#定义一个字符串str1
>>> str1 = "3w.gorly.test.com.cn"

#使用默认分隔符分割字符串str1
>>> print str1.split()
['3w.gorly.test.com.cn']

#指定分隔符为'.'，进行分割字符串str1
>>> print str1.split('.')
['3w', 'gorly', 'test', 'com', 'cn']

#指定分隔符为'.'，并且指定切割次数为0次
>>> print str1.split('.',0)
['3w.gorly.test.com.cn']

#指定分隔符为'.'，并且指定切割次数为1次
>>> print str1.split('.',1)
['3w', 'gorly.test.com.cn']

#指定分隔符为'.'，并且指定切割次数为2次
>>> print str1.split('.',2)
['3w', 'gorly', 'test.com.cn']

#这种分割等价于不指定分割次数str1.split('.')情况
>>> print str1.split('.',-1)
['3w', 'gorly', 'test', 'com', 'cn']

#指定分隔符为'.'，并取序列下标为0的项
>>> print str1.split('.')[0]
3w

```

2）分割路径

```python
>>> import os
>>> print os.path.split("d:\test\a.txt")
('d:', '\test\x07.txt')
>>> print os.path.split('d:/test/a.txt')
('d:/test', 'a.txt')
>>> print os.path.split('d:\\test\\a.txt')
('d:\\test', 'a.txt')
```

### 2、ASCII码和字符之间的转换

```python
# 用户输入字符
c = input("请输入一个字符: ")
 
# 用户输入ASCII码，并将输入的数字转为整型
a = int(input("请输入一个ASCII码: "))
 
print( c + " 的ASCII 码为", ord(c))
print( a , " 对应的字符为", chr(a))
```



## 十一、base64

1、将图片转换为py文件

```python
import base64


def pic_to_py(path_):
    """
    将图像文件转换为py文件
    :param path_:
    :return:
    """
    with open(path_, "rb") as f:
        read_pic = f.read()

    b64str = base64.b64encode(read_pic)

    write_data = "img = " + '"' + b64str.decode("utf-8") + '"'
    print(write_data)

    write_path = path_.replace('.', '_') + ".py"
    with open(write_path, "w+") as f:
        f.write(write_data)


if __name__ == '__main__':
    path = "20190428102108309_easyicon_net_256.ico"  # 文件写入路径
    pic_to_py(path)

```

## 十二、用pyinstaller打包成exe文件

```dos
pyinstaller -F -w -i 图标名.ico 文件名.py
-F：打包成一个大的exe文件，默认打包成一个文件夹
-w：去掉开始时的黑色窗口
-i：图标
```

## 十三、pip安装慢

-i https://pypi.tuna.tsinghua.edu.cn/simple

## 十四、pyinstaller

### 1、打包32位的exe文件

1、进入命令提示符窗口

```ini
set CONDA_FORCE_32BIT=1 //切换到32位
conda create --name python36 python=3.6 //创建一个python3.6的环境，命名为python36
conda info --envs //查看是否添加成功
activate python36 //切换到python3.6环境
python --version //确认python环境

pip -V //再次确认是否为32位的pip
pip install pyinstaller //安装pyinstaller

//然后pyinstaller -F xxx.py就可以开开心心打包32位的exe程序了
```

2、此时打包的文件在其他电脑运行时，会出现failed to execute问题

解决方案：

将Anaconda\Library\bin文件夹下的所有dll打包到目标电脑上，并将文件夹添加到目标电脑的环境变量path中

### 2、打包后运行提示找不到模块

​	在打包时候，并没有提示错误，可以顺利打包成exe文件。但是在运行打包好的软件时，会提示找不到模块，本人遇到的是找不到第三方模块，例如 requests 。这时候需要在打包时指定 -p 参数，后面跟上python目录下的第三方库模板目录路径 site-packages。再打包就成功了

```shell
pyinstaller example.py -F -p C:/python/lib/site-packages
```

### 3、将运行结果全部输出到txt中

```shell
d:\tc2\test.exe > d:\output.txt
```

### 4、打包遇到的问题：

UnicodeDecodeError: 'utf-8' codec can't decode byte 0xa9 in position 15: invalid
 start byte



## *More

### 1、"%s"%的用法

%s表示格式化一个对象为字符            

"%±(正负号表示)3(数字表示字符串的长度)s"%(取代s的字符串)

```python
'''当字符串的长度小于3时，在字符串的两侧填补空格，使得字符串的长度为3'''
a = 1
print("a=%3s"%a)
# 输出：__1
print("a=%-3s"%a)
# 输出：1__
'''当字符串的长度大于3时，按照字符串的长度打印出结果'''
a = "result"
print("a=%3s"%a)
# 输出：result
```

小数点后的数字表示截取的字符串长度

```python
a = 1234567890
print("a=%.3s"%a)
# 输出：123
```

 %*.*s表示精度， 两个*的值分别由%string前面被两个逗号隔开的数值来指定

```python
string = 'good'
print("a=%*.*s"%(1,2,string))
# 输出：go
```



