## 一、帮助文档

[Tkinter](<https://blog.csdn.net/Fighting_Boom/article/details/81268074>)

[web.py](<https://blog.csdn.net/freeking101/article/details/53020865>)

## 二、PYQT5

### Printer

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

