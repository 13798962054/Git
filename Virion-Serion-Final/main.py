from PyQt5 import *
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from PyQt5.QtPrintSupport import *
import sys
import math
# 正则
import re

class hasOpenWindow:
    projectSetting = False

class Test:
    Name = "M.pneum"
    IgX = "IgG"
    Lot = "SHB.DX"
    L = 20.00
    U = 30.00
    A = 0.013
    B = 1.216
    C = 3.756
    D = 2.233
    RV = 0.85
    STD1 = 0.895
    STD2 = 0.885
    Delta = 0.011
    MV = (STD1 + STD2) / 2
    BLK = 0
    referenceOD = 1.17
    referenceUnits = 3.31
    rangeLOD = 0.59
    rangeUOD = 1.80




'''解决子窗口弹出卡死的问题(QDialog)'''
class Main(QDialog):
    # 每一格的宽度
    itemWidth = 82
    # 每一格的高度
    itemHeight = 25
    # 主表格宽
    mainTableWidth = itemWidth * 12 + 20
    # 主表格高
    mainTableHeight = itemHeight * 24 + 27
    # 窗口宽
    windowWidth = itemWidth * 12 + 40
    # 窗口高
    windowHeight = itemHeight * 24 + 166

    def __init__(self):
        super().__init__()
        self.setupUI()
        self.setWindowFlags(Qt.WindowMaximizeButtonHint | Qt.WindowMinimizeButtonHint | Qt.WindowCloseButtonHint)

    def setupUI(self):
        self.setWindowTitle("维润简易评估软件")
        self.setWindowIcon(QIcon("icon/logo.png"))
        self.setFixedSize(self.windowWidth, self.windowHeight)
        # 头
        self.head = QVBoxLayout()

        self.mainTable = QTableWidget(self)
        self.bottomTable = QTableWidget(self)

        # 设置每一个Table的基本格式
        self.setHead()

        self.setMainTable(self.mainTable)
        self.setBottomTable(self.bottomTable)

        # 通过QVBoxLayout添加元素
        self.vbox = QVBoxLayout()
        self.vbox.addLayout(self.head)
        self.vbox.addWidget(self.mainTable)
        self.vbox.addWidget(self.bottomTable)
        self.vbox.setSpacing(0)

        # 设置样式表
        self.setCSS()
        # 将vbox添加到界面中
        self.setLayout(self.vbox)

    # 设置头部表格
    def setHead(self):
        # 下拉列表
        self.list = QComboBox()
        # 项目设置按钮
        self.projectSettingButton = QPushButton("项目设置")
        self.projectSettingButton.setFixedSize(100,40)
        self.list.setFixedSize(100,40)
        self.list.setStyleSheet("background-color:#ffffff")
        # 打印按钮
        self.printButton = QPushButton("打印")
        self.printButton.setFixedSize(80,40)
        # 确认按钮
        self.checkButton = QPushButton("确认")
        self.checkButton.setFixedSize(80,40)
        headGroupBox = QGroupBox("选项")
        # 空白
        blank1 = QLabel("")
        blank2 = QLabel("                                                                         ")

        layout = QGridLayout()
        # layout.addWidget(self.list, 0, 2)
        layout.addWidget(self.projectSettingButton, 0, 2)
        layout.addWidget(blank2, 0, 3)
        layout.addWidget(self.printButton, 0, 4)
        layout.addWidget(self.checkButton, 0, 5)
        headGroupBox.setLayout(layout)
        self.head.addWidget(headGroupBox)


        # 定义下拉列表
        self.list.addItems(["主界面", "项目设置"])

        # 绑定下拉列表选择事件
        self.list.activated[str].connect(self.listSelectedEvent)

        # 绑定项目设置按钮点击事件
        self.projectSettingButton.clicked.connect(self.projectSettingButtonEvent)
        # 绑定打印按钮点击事件
        self.printButton.clicked.connect(self.printButtonEvent)
        # 绑定确定按钮点击事件
        self.checkButton.clicked.connect(self.checkButtonEvent)


    # 设置主表格
    def setMainTable(self,table):
        table.setEditTriggers(QAbstractItemView.NoEditTriggers)
        # 固定主表格的大小
        table.setFixedSize(self.mainTableWidth, self.mainTableHeight)
        # 设置表格有24行12列。
        table.setColumnCount(12)
        table.setRowCount(24)
        table.setVerticalHeaderLabels(["", "A", "", "", 'B', "",
                                       "", 'C', "", "", 'D', "",
                                       "", 'E', "", "", 'F', "",
                                       "", 'G', "", "", 'H', ""])
        for i in range(0,12):
            # 设置格子宽
            table.setColumnWidth(i, self.itemWidth)
            # 初始化格子
            for j in range(0, 24):
                if j % 3 == 0:
                    self.setMainLineEdit(i, j, table)

                else:
                    item = QTableWidgetItem("")
                    table.setItem(j, i, item)
                    # 灰白相间
                    # if j in [0,1,2,
                    #          6,7,8,
                    #          12,13,14,
                    #          18,19,20]:
                    item.setBackground(QColor("#D3D3D3"))
        for i in range(0,24):
            # 设置格子高
            table.setRowHeight(i, self.itemHeight)

    # 设置表格样式中的输入框
    def setMainLineEdit(self, i, j, table):
        item = QLineEdit("")
        table.setCellWidget(j, i, item)
        arrayTemp = [i, j]
        item.textChanged.connect(lambda: self.handeTextChange(arrayTemp))
    # 设置底部表格
    def setBottomTable(self, table):
        table.setFixedSize(self.mainTableWidth, self.itemHeight*2)
        table.setStyleSheet('background-color:#C1BFFF')

    # 复选框设置
    def listSelectedEvent(self, text):
        if(text == "项目设置"):
            if(hasOpenWindow.projectSetting == False):
                hasOpenWindow.projectSetting = True
                projectSettring = ProjectSetting()
                projectSettring.show()
                projectSettring.exec_()

            else:
                reply = QMessageBox.question(self, '警告', "项目设置已打开", QMessageBox.Yes)
    # 项目设置按钮点击事件
    def projectSettingButtonEvent(self):
        if (hasOpenWindow.projectSetting == False):
            hasOpenWindow.projectSetting = True
            projectSettring = ProjectSetting()
            projectSettring.show()
            projectSettring.exec_()

        else:
            reply = QMessageBox.question(self, '警告', "项目设置已打开", QMessageBox.Yes)
    def setCSS(self):
        self.setStyleSheet("QGroupBox{border-color:#ff0000}"
                           "QDialog{background-color:#C1BFFF;margin:0;padding:0}")

    # QLineEdit改变事件
    def handeTextChange(self, array):
        i = array[1]
        j = array[0]
        # 改变行数据
        od = self.mainTable.cellWidget(i, j).text()

        # 计算units的值
        units = self.calcUnits( od )
        # 计算Int的值
        Int = self.calcInt( od, units)
        # 输出units的值
        if(units == ">max" or units == "<min" or units == "" or units == "请输入数字"):
            self.mainTable.item(i + 1, j).setText( units )
        else:
            self.mainTable.item(i + 1, j).setText( str( round(units,2) ) )
        # 输出Int.的值
        self.mainTable.item(i + 2, j).setText( Int )
    # 计算units
    def calcUnits(self, od):
        if(self.is_number(od) == False):
            return "请输入数字"
        od = float(od)
        if(od == 0 or od == ""):
            return ""
        elif(Test.A == "" or Test.B == "" or Test.C == "" or Test.D == "" or Test.RV == "" or od-Test.BLK == 0):
            return ""
        elif(   ( (od-Test.BLK)*Test.RV / (Test.MV-Test.BLK) ) < Test.A   ):
            return "<min"
        elif(   ( (od-Test.BLK)*Test.RV / (Test.MV-Test.BLK) ) > Test.D   ):
            return ">max"
        else:
            return math.exp(   Test.C - 1/Test.B*math.log(  (Test.D-Test.A) / ( (od-Test.BLK)* Test.RV/(Test.MV-Test.BLK)-Test.A ) - 1  )   )

    # 计算Int的值
    def calcInt(self, od , units):
        if(self.is_number(od) == False):
            return "请输入数字"
        od = float(od)

        if(od == 0 or units == "" or Test.L == "" or Test.U == ""):
            return ""
        elif(units == "<min"):
            return "neg"
        elif(units == ">max"):
            return "pos"
        elif(units > Test.U):
            return "pos"
        elif(units < Test.L):
            return "neg"
        else:
            return "?"

    # 判断是否为数字
    def is_number(self, num):
        try:
            float(num)
            return True
        except ValueError:
            pass

        try:
            import unicodedata
            unicodedata.numeric(num)
            return True
        except (TypeError, ValueError):
            pass
        return False

    # 打印按钮事件
    def printButtonEvent(self):
        printer = QPrinter(QPrinter.HighResolution)
        # 横向打印
        # printer.setPageOrientation(QPrinter.Landscape)
        # /* 打印预览 */
        preview = QPrintPreviewDialog(printer, self.mainTable)
        # 设置打印预览窗口大小
        preview.resize(1200, 900)
        """
         * QPrintPreviewDialog类提供了一个打印预览对话框，里面功能比较全，
         * paintRequested(QPrinter *printer)是系统提供的，
         * 当preview.exec()执行时该信号被触发，
         * plotPic(QPrinter *printer)是用户自定义的槽函数，图像的绘制就在这个函数里。
        """
        preview.paintRequested.connect(self.plotPic)
        preview.exec()  # /* 等待预览界面退出 */

    def plotPic(self, printer):
        painter = QPainter(printer);
        # 设置纸张的边距
        # printer.setPageMargins(12, 16, 12, 20, QPrinter.Millimeter)

        image = QPixmap()
        image = self.mainTable.grab(QRect(QPoint(0, 0),
                                  QSize(self.mainTable.size().width(),
                                        self.mainTable.size().height()
                                        )
                                  )
                            )  # /* 绘制窗口至画布 */
        # QRect
        rect = painter.viewport();
        # QSize
        size = image.size();
        size.scale(rect.size(), Qt.KeepAspectRatio)  # //此处保证图片显示完整
        painter.setViewport(rect.x(), rect.y(), size.width(), size.height());
        painter.setWindow(image.rect());
        painter.drawPixmap(0, 0, image);  # /* 数据显示至预览界面 */

    # 确认按钮事件
    def checkButtonEvent(self):
        print("check")
        # 打印表格(0,0)的文本内容
        # print(self.mainTable.item(0,0).text())

    # 键盘监听事件
    # def keyPressEvent(self, QKeyEvent):


'''项目设置窗口'''
class ProjectSetting(QDialog):
    # 窗口宽
    windowWidth = 850
    # 窗口高
    windowHeight = 550

    def __init__(self):
        super().__init__()
        self.setupUI()
        self.setWindowFlags(Qt.WindowMaximizeButtonHint | Qt.WindowMinimizeButtonHint | Qt.WindowCloseButtonHint)
    def setupUI(self):
        # 設置窗口固定大小
        self.setFixedSize(self.windowWidth, self.windowHeight)
        # 窗口圖標
        self.setWindowIcon(QIcon("icon/logo.png"))
        # 窗口標題
        self.setWindowTitle("項目设置")
        # 主布局
        self.mainVBox = QVBoxLayout()

        # 基本信息
        self.InfoVBox = QVBoxLayout()
        # 设置基本信息
        self.setupInfo()

        # 标准血清(利用QTabWidget布局)
        self.standerVBox = QVBoxLayout()
        # 设置标准血清
        self.setupStander()

        # 定量范围
        self.rangeVBox = QVBoxLayout()
        # 设置定量范围
        self.setupRange()

        # 保存取消按钮
        self.buttonLayout = QGridLayout()
        # 设置按钮
        self.setupButton()

        self.mainVBox.addLayout(self.InfoVBox)
        self.mainVBox.addLayout(self.standerVBox)
        self.mainVBox.addLayout(self.rangeVBox)
        self.mainVBox.addLayout(self.buttonLayout)

        self.setStyleSheet('QDialog{background-color:#C1BFFF;width:20px}'
                           "QLineEdit{background-color:#ffffff}")
        # 将vbox添加到界面中
        self.setLayout(self.mainVBox)


    def setupInfo(self):
        self.infoGroupBox = QGroupBox("基本信息")
        infolayout = QGridLayout()

        # 基本信息第一行数据
        # 试剂名：
        self.reagentLabel = QLabel("试剂名：")
        self.reagenLineEdit = QLineEdit(Test.Name)
        # IgX：
        self.igXLabel = QLabel("IgX：")
        self.igXLineEdit = QLineEdit(Test.IgX)
        # 批号：
        self.batchLabel = QLabel("批号：")
        self.batchLineEdit = QLineEdit(Test.Lot)

        # 基本信息第二行数据
        # 边界线
        self.borderlineLabel = QLabel("边界线：")
        self.borderlineLLineEdit = QLineEdit( str(Test.L) )
        dottedLabel = QLabel(" - - - ")
        self.borderLineULineEdit = QLineEdit( str(Test.U) )
        # 单位
        self.unitLabel = QLabel("单位：")
        self.unitComboBox = QComboBox()
        self.unitComboBox.addItems(["U/ml"])

        infolayout.setSpacing(10)
        # 添加第一行
        infolayout.addWidget(self.reagentLabel, 1, 0)
        infolayout.addWidget(self.reagenLineEdit, 1, 1)
        infolayout.addWidget(self.igXLabel, 1, 2)
        infolayout.addWidget(self.igXLineEdit, 1, 3)
        infolayout.addWidget(self.batchLabel, 1, 4)
        infolayout.addWidget(self.batchLineEdit, 1, 5)

        # 添加第二行
        infolayout.addWidget(self.borderlineLabel, 2, 0)
        infolayout.addWidget(self.borderlineLLineEdit, 2, 1)
        infolayout.addWidget(dottedLabel, 2, 2)
        infolayout.addWidget(self.borderLineULineEdit, 2, 3)
        infolayout.addWidget(self.unitLabel, 2, 4)
        infolayout.addWidget(self.unitComboBox, 2, 5)

        self.infoGroupBox.setLayout(infolayout)
        self.InfoVBox.addWidget(self.infoGroupBox)

    def setupStander(self):
        self.standerGroupBox = QGroupBox("标准血清")
        standerLayout = QGridLayout()
        # 第一行
        self.referenceODLabel = QLabel("参考OD值：")
        self.referenceODLineEdit = QLineEdit( str(Test.referenceOD) )

        self.referenceUnitsLabel = QLabel("      参考Units：")
        self.referenceUnitsLineEdit = QLineEdit( str(Test.referenceUnits) )


        self.rangeODLabel = QLabel("      有效范围(OD)：")
        self.rangeODLineEdit1 = QLineEdit( str(Test.rangeLOD) )
        # 虚线
        dottedLabel = QLabel(" - - - ")
        self.rangeODLineEdit2 = QLineEdit( str(Test.rangeUOD) )

        # 第二行
        self.aLabel = QLabel("      A：")
        self.aLineEdit = QLineEdit( str(Test.A) )
        self.aLineEdit.setFixedWidth(100)

        self.bLabel = QLabel("              B：")
        self.bLineEdit = QLineEdit( str(Test.B) )

        self.cLabel = QLabel("                 C：")
        self.cLineEdit = QLineEdit( str(Test.C) )

        self.dLabel = QLabel("      D：")
        self.dLineEdit = QLineEdit( str(Test.D) )

        # 第三行
        self.STD1Label = QLabel("    STD1：")
        self.STD1LineEdit = QLineEdit(str(Test.STD1))

        self.STD2Label = QLabel("          STD2：")
        self.STD2LineEdit = QLineEdit(str(Test.STD2))

        self.BLKLabel = QLabel("               BLK：")
        self.BLKLineEdit = QLineEdit(str(Test.BLK))

        self.RVLabel = QLabel("     RV：")
        self.RVLineEdit = QLineEdit(str(Test.RV))
        # 列间距
        standerLayout.setSpacing(10)
        # 行间距
        standerLayout.setColumnStretch(1, 10)

        # 添加第一行
        standerLayout.addWidget(self.referenceODLabel, 1, 0)
        standerLayout.addWidget(self.referenceODLineEdit, 1, 1)
        standerLayout.addWidget(self.referenceUnitsLabel, 1, 2)
        standerLayout.addWidget(self.referenceUnitsLineEdit, 1, 3)
        standerLayout.addWidget(self.rangeODLabel, 1, 4)
        standerLayout.addWidget(self.rangeODLineEdit1, 1, 5)
        standerLayout.addWidget(dottedLabel, 1, 6)
        standerLayout.addWidget(self.rangeODLineEdit2, 1, 7)

        # 添加第二行
        standerLayout.addWidget(self.aLabel, 2, 0)
        standerLayout.addWidget(self.aLineEdit, 2, 1)
        standerLayout.addWidget(self.bLabel, 2, 2)
        standerLayout.addWidget(self.bLineEdit, 2, 3)
        standerLayout.addWidget(self.cLabel, 2, 4)
        standerLayout.addWidget(self.cLineEdit, 2, 5)
        standerLayout.addWidget(self.dLabel, 2, 6)
        standerLayout.addWidget(self.dLineEdit, 2, 7)

        # 添加第三行
        standerLayout.addWidget(self.STD1Label, 3, 0)
        standerLayout.addWidget(self.STD1LineEdit, 3, 1)
        standerLayout.addWidget(self.STD2Label, 3, 2)
        standerLayout.addWidget(self.STD2LineEdit, 3, 3)
        standerLayout.addWidget(self.BLKLabel, 3, 4)
        standerLayout.addWidget(self.BLKLineEdit, 3, 5)
        standerLayout.addWidget(self.RVLabel, 3, 6)
        standerLayout.addWidget(self.RVLineEdit, 3, 7)

        self.standerGroupBox.setLayout(standerLayout)
        self.standerVBox.addWidget(self.standerGroupBox)

    def setupRange(self):
        self.rangeGroupBox = QGroupBox("定量范围")
        rangeLayout = QGridLayout()

        # 第一行
        self.dectionRangeLabel = QLabel("检测范围(Units)：        ")
        self.dectionRangeLineEdit1 = QLineEdit("0.7")
        # 虚线
        dottedLabel1 = QLabel("  - - -  ")
        self.dectionRangeLineEdit2 = QLineEdit("50")
        # 空白
        blank = QLabel("                                       ")

        # 第二行
        self.criticalRangeLabel = QLabel("临界值范围(Units)：     ")
        self.criticalRangeLineEdit1 = QLineEdit("1.4")
        # 虚线
        dottedLabel2 = QLabel("  - - -  ")
        self.criticalRangeLineEdit2 = QLineEdit("2.6")


        # 添加第一行数据
        rangeLayout.addWidget(self.dectionRangeLabel, 1, 0)
        rangeLayout.addWidget(self.dectionRangeLineEdit1, 1, 1)
        rangeLayout.addWidget(dottedLabel1, 1, 2)
        rangeLayout.addWidget(self.dectionRangeLineEdit2, 1, 3)
        rangeLayout.addWidget(blank, 1, 4)

        # 添加第二行数据
        rangeLayout.addWidget(self.criticalRangeLabel, 2, 0)
        rangeLayout.addWidget(self.criticalRangeLineEdit1, 2, 1)
        rangeLayout.addWidget(dottedLabel2, 2, 2)
        rangeLayout.addWidget(self.criticalRangeLineEdit2, 2, 3)

        self.rangeGroupBox.setLayout(rangeLayout)
        self.rangeVBox.addWidget(self.rangeGroupBox)

    def setupButton(self):
        # 空白
        blank = QLabel("                                                                                                     ")
        self.saveButton = QPushButton("保存")
        self.saveButton.setFixedHeight(30)
        self.cancleButton = QPushButton("取消")
        self.cancleButton.setFixedHeight(30)
        # 绑定按钮事件
        self.saveButton.clicked.connect(self.saveButtonEvent)
        self.cancleButton.clicked.connect(self.cancleButtonEvent)

        self.buttonLayout.addWidget(blank, 1, 0)
        self.buttonLayout.addWidget(self.saveButton, 1, 1)
        self.buttonLayout.addWidget(self.cancleButton, 1, 2)

    # 监听QLineEdit的chagne事件
    # 试剂名:
    # IgX:
    # 批号：
    # 边界线L
    # 边界线U
    # A
    # B
    # C
    # D
    # RV
    # STD1
    # STD2
    # Delta
    # MV
    # BLK
    # 判断是否为数字
    def is_number(self, num):
        try:
            float(num)
            return True
        except ValueError:
            pass

        try:
            import unicodedata
            unicodedata.numeric(num)
            return True
        except (TypeError, ValueError):
            pass
        return False

    # 保存按钮事件
    def saveButtonEvent(self):
        warringMessage = ""
        if(self.is_number( self.borderlineLLineEdit.text() ) == False):
            warringMessage += "边界线最低值设置有误\n"
        if(self.is_number( self.borderLineULineEdit.text() ) == False):
            warringMessage += "边界线最高值设置有误\n"
        if (self.is_number(self.referenceODLineEdit.text()) == False):
            warringMessage += "参考OD值设置有误\n"
        if (self.is_number(self.referenceUnitsLineEdit.text()) == False):
            warringMessage += "参考Units值设置有误\n"
        if (self.is_number(self.rangeODLineEdit1.text()) == False):
            warringMessage += "有效范围(OD)最小值设置有误\n"
        if (self.is_number(self.rangeODLineEdit2.text()) == False):
            warringMessage += "有效范围(OD)最大值设置有误\n"
        if (self.is_number(self.aLineEdit.text()) == False):
            warringMessage += "A值设置有误\n"
        if (self.is_number(self.bLineEdit.text()) == False):
            warringMessage += "B值设置有误\n"
        if (self.is_number(self.cLineEdit.text()) == False):
            warringMessage += "C值设置有误\n"
        if (self.is_number(self.dLineEdit.text()) == False):
            warringMessage += "D值设置有误\n"
        if (self.is_number(self.STD1LineEdit.text()) == False):
            warringMessage += "STD1值设置有误\n"
        if (self.is_number(self.STD2LineEdit.text()) == False):
            warringMessage += "STD2值设置有误\n"
        if (self.is_number(self.BLKLineEdit.text()) == False):
            warringMessage += "BLK值设置有误\n"
        if (self.is_number(self.RVLineEdit.text()) == False):
            warringMessage += "RV值设置有误\n"
        if(warringMessage == ""):
            Test.Name = self.reagenLineEdit.text()
            Test.IgX = self.igXLineEdit.text()
            # 批號
            Test.Lot = self.batchLineEdit.text()
            # 邊界綫
            Test.L = float( self.borderlineLLineEdit.text() )
            Test.U = float( self.borderLineULineEdit.text() )
            Test.referenceOD = float( self.referenceODLineEdit.text() )
            Test.referenceUnits = float( self.referenceUnitsLineEdit.text() )
            Test.rangeLOD = float( self.rangeODLineEdit1.text() )
            Test.rangeUOD = float( self.rangeODLineEdit2.text() )
            Test.A = float( self.aLineEdit.text() )
            Test.B = float( self.bLineEdit.text() )
            Test.C = float( self.cLineEdit.text() )
            Test.D = float( self.dLineEdit.text() )
            Test.STD1 = float( self.STD1LineEdit.text() )
            Test.STD2 = float( self.STD2LineEdit.text() )
            Test.BLK = float( self.BLKLineEdit.text() )
            Test.RV = float( self.RVLineEdit.text() )
        # 如果有错误
        else:
            reply = QMessageBox.question(self, '警告', warringMessage, QMessageBox.Yes)

    # 取消按钮事件
    def cancleButtonEvent(self):
        self.close()

    # 窗口关闭事件
    def closeEvent(self, QCloseEvent):
        hasOpenWindow.projectSetting = False
        QCloseEvent.accept()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    main = Main()
    main.show()
    main.exec_()
    app.exit()


def is_number(num):
    pattern = re.compile(r'^[-+]?[-0-9]\d*\.\d*|[-+]?\.?[0-9]\d*$')
    result = pattern.match(num)
    if result:
        return True
    else:
        return False