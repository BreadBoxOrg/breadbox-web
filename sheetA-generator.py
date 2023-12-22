from openpyxl import Workbook

# sheet A style 

tb = Workbook()
ts = tb.active
##################################
# handle input here 

##################################

# create column layout
# start with 
WEEKS = 4
DAYS = 7

for x in range(2, WEEKS):
    cell = ts.cell(row=x, column=2)
    cell.value = "Week-" + f"{x}"


print("sheet created")
tb.save('plan.xlsx')
