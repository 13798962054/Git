Private Sub Worksheet_Activate()
    MsgBox "Open"
    Dim i, j, sheet As Integer
    For i = 6 To 23
        For j = 4 To 100
            Cells(i, j) = 1
        Next
    Next
            
End Sub



## 一、合并excel

1、将一个Excel中的所有工作表合并到一个工作表中

```vb
Sub 合并工作表()
    Dim X As Worksheet
    For Each X In Worksheets
        If X.Name = "Combined" Then
            X.Delete
        End If
    Next

    Dim J As Integer
    On Error Resume Next
    Sheets(1).Select
    Worksheets.Add
    Sheets(1).Name = "Combined"
    Sheets(1).Columns("A").ColumnWidth = 24.88
    Sheets(1).Columns("B").ColumnWidth = 73.38
    Sheets(1).Columns("C").ColumnWidth = 7.75
    Sheets(1).Columns("D").ColumnWidth = 10.25
    Sheets(1).Columns("E").ColumnWidth = 53.5
    Sheets(2).Activate
    Range("A1").EntireRow.Select
    Selection.Copy Destination:=Sheets(1).Range("A1")
    For J = 2 To Sheets.Count
        Sheets(J).Activate
        c = Sheets(J).Range("IV1").End(xlToLeft).Column
        r = Sheets(J).Range("A65536").End(xlUp).Row
        Range("A2").Resize(r - 1, c).Select
        Selection.Copy Destination:=Sheets(1).Range("A65536").End(xlUp)(2)
    Next

End Sub
```

2、将多个excel文件合并一个excel文件中，工作簿不合并

效果图：

![1567996159752](E:\owen\data\TyporaData\vba\2.png)

```vb

Private Sub hb()
    Dim hb As Object, kOne As Boolean, tabcolor As Long
    Set hb = Workbooks.Add
    Application.DisplayAlerts = False
    For i = hb.Sheets.Count To 2 Step -1
        hb.Sheets(i).Delete
    Next
     
    Dim FileName As String, FilePath As String
    Dim iFolder As Object, rwk As Object, Sh As Object
    Set iFolder = CreateObject("shell.application").BrowseForFolder(0, "请选择要合并的文件夹", 0, "")
    If iFolder Is Nothing Then Exit Sub
    FilePath = iFolder.Items.Item.Path
    FilePath = IIf(Right(FilePath, 1) = "\", FilePath, FilePath & "\")
    FileName = Dir(FilePath & "*.xls*")
    Do Until Len(FileName) = 0
        If UCase(FilePath & FileName) <> UCase(ThisWorkbook.Path & "\" & ThisWorkbook.Name) Then
            Set rwk = Workbooks.Open(FileName:=FilePath & FileName)
            tabcolor = Int(Rnd * 56) + 1
            With rwk
                For Each Sh In .Worksheets
                    Sh.Copy After:=hb.Sheets(hb.Sheets.Count)
                    hb.Sheets(hb.Sheets.Count).Name = FileName & "-" & Sh.Name
                    hb.Sheets(hb.Sheets.Count).Tab.ColorIndex = tabcolor
                    If Not kOne Then hb.Sheets(1).Delete: kOne = True
                Next
                .Close True
             End With
        End If
        Set rwk = Nothing
        FileName = Dir
    Loop
    Application.DisplayAlerts = True
End Sub

```



3、将多个excel文件合并在一个excel文件的一个sheet中

效果图

![img](E:\owen\data\TyporaData\vba\3.png)

```basic
sub 合并当前目录下所有工作簿的全部工作表() 
dim mypath, myname, awbname 
dim wb as workbook, wbn as string 
dim g as long 
dim num as long 
dim box as string 
application.screenupdating = false 
mypath = activeworkbook.path 
myname = dir(mypath & "\" & "*.xls") 
awbname = activeworkbook.name 
num = 0 
do while myname <> "" 
if myname <> awbname then 
set wb = workbooks.open(mypath & "\" & myname) 
num = num + 1 
with workbooks(1).activesheet 
.cells(.range("a65536").end(xlup).row + 2, 1) = left(myname, len(myname) - 4) 
for g = 1 to sheets.count 
wb.sheets(g).usedrange.copy .cells(.range("a65536").end(xlup).row + 1, 1) 
next 
wbn = wbn & chr(13) & wb.name 
wb.close false 
end with 
end if 
myname = dir 
loop 
range("a1").select 
application.screenupdating = true 
msgbox "共合并了" & num & "个工作薄下的全部工作表。如下：" & chr(13) & wbn, vbinformation, "提示" 
end sub
```

