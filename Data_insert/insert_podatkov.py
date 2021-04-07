import xlrd
import os

existing_files = os.listdir()
for f in existing_files:
    if f.split('.')[1] == 'txt':
        os.remove(f)

wb = xlrd.open_workbook("../Baza_Projekt.xlsx")

zivali = wb.sheet_by_index(0)
uporabniki = wb.sheet_by_index(1)
kategorija = wb.sheet_by_index(2)
nadkategorija = wb.sheet_by_index(3)
kraj = wb.sheet_by_index(4)

print('----------------------------------------------------------------------')
print('Tabela KRAJ')

with open('kraj.txt', 'a') as the_file:    

    for i in range(kraj.nrows):
        values = ''
        
        for j in range(kraj.ncols):
            
            if i == 0:
                values = values + str(kraj.cell_value(i, j))        
            elif j == 1:
                values = values + str(int(kraj.cell_value(i, j)))
            else:
                values = values + "'" + str(kraj.cell_value(i, j)) + "'"
                
            if j < kraj.ncols - 1:
                values = values + ", "
        
        if i == 0:
            variables = values
        else:
            the_file.write("INSERT INTO kraj ("+variables+") VALUES ("+values+");\n")
    #        print("INSERT INTO kraj ("+variables+") VALUES ("+values+");")
    
print('----------------------------------------------------------------------')
print('Tabela NADKATEGORIJA')

with open('nadkategorija.txt', 'a') as the_file:    

    for i in range(nadkategorija.nrows):
        values = ''
        
        for j in range(nadkategorija.ncols):
            
            if i == 0:
                values = values + str(nadkategorija.cell_value(i, j))        
            else:
                values = values + "'" + str(nadkategorija.cell_value(i, j)) + "'"
                
            if j < nadkategorija.ncols - 1:
                values = values + ", "
        
        if i == 0:
            variables = values
        else:
            the_file.write("INSERT INTO nadkategorija ("+variables+") VALUES ("+values+");\n")
#            print("INSERT INTO nadkategorija ("+variables+") VALUES ("+values+");")
            
print('----------------------------------------------------------------------')
print('Tabela KATEGORIJA')

with open('kategorija.txt', 'a') as the_file:    

    for i in range(kategorija.nrows):
        values = ''
        
        for j in range(kategorija.ncols):
            
            if i == 0:
                values = values + str(kategorija.cell_value(i, j))   
            elif j == 0:
                values = values + str(int(kategorija.cell_value(i, j)))
            else:
                values = values + "'" + str(kategorija.cell_value(i, j)) + "'"
                
            if j < kategorija.ncols - 1:
                values = values + ", "
        
        if i == 0:
            variables = values
        else:
            the_file.write("INSERT INTO kategorija ("+variables+") VALUES ("+values+");\n")
#            print("INSERT INTO kategorija ("+variables+") VALUES ("+values+");")
            
print('----------------------------------------------------------------------')
print('Tabela UPORABNIKI')

with open('uporabniki.txt', 'a') as the_file:    

    for i in range(uporabniki.nrows):
        values = ''
        
        for j in range(uporabniki.ncols):
            
            if i == 0:
                values = values + str(uporabniki.cell_value(i, j))   
            elif j == 2:
                d,m,y = uporabniki.cell_value(i, j).split('.')
                values = values + "'" + d + "-" + m + "-" + y + "'"
            else:
                values = values + "'" + str(uporabniki.cell_value(i, j)) + "'"
                
            if j < uporabniki.ncols - 1:
                values = values + ", "
        
        if i == 0:
            variables = values
        else:
            the_file.write("INSERT INTO uporabniki ("+variables+") VALUES ("+values+");\n")
#            print("INSERT INTO uporabniki ("+variables+") VALUES ("+values+");")
            
print('----------------------------------------------------------------------')
print('Tabela ŽIVALI')

with open('zivali.txt', 'a') as the_file:    

    for i in range(zivali.nrows):
        values = ''
        
        if zivali.cell_value(i, 0) == '':
            continue
        
        for j in range(zivali.ncols):
            
            if i == 0:
                values = values + str(zivali.cell_value(i, j))   
            elif j in [0,3,7]:
                values = values + str(int(zivali.cell_value(i, j)))
            elif j == 10:
                d,m,y = zivali.cell_value(i, j).split('.')
                values = values + "'" + d + "-" + m + "-" + y + "'"
            else:
                values = values + "'" + str(zivali.cell_value(i, j)) + "'"
                
            if j < zivali.ncols - 1:
                values = values + ", "
        
        if i == 0:
            variables = values
        else:
            the_file.write("INSERT INTO živali ("+variables+") VALUES ("+values+");\n")
#            print("INSERT INTO zivali ("+variables+") VALUES ("+values+");")