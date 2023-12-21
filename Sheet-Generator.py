from openpyxl import Workbook


tb = Workbook()
ts = tb.active

ts = tb.create_sheet("test sheet")
print("sheet created")
tb.save("test-sheet.xlsx")