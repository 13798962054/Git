Private Sub Worksheet_Activate()
    MsgBox "Open"
    Dim i, j, sheet As Integer
    For i = 6 To 23
        For j = 4 To 100
            Cells(i, j) = 1
        Next
    Next
            
End Sub

