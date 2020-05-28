import csv 
import io
china_term=[]
taiwan_term=[]
#刪除第一行，然後儲存刪除後的檔案
with open("googlesheet.csv",'r',encoding="utf-8") as f:
    with open("googlesheet_n.csv",'w', encoding='utf8') as f1:
        next(f) # skip header line
        for line in f:
            f1.write(line)
#讀取新檔案
with open('googlesheet_n.csv', newline='', encoding='utf8') as csvfile:
    rows = csv.DictReader(csvfile)
    for row in rows:
        print(row['台灣用語'],row['中國用語/其他'])
        taiwan_term.append(row['台灣用語'])
        china_term.append(row['中國用語/其他'])
#建立txt
with io.open("taiwan_term.txt",'w', encoding='utf8') as file:
    for i in taiwan_term:   
        if(i=="行" or i=="列" or i=="" or i==" "):
            continue 
        file.write(i)
        file.write(",")
with io.open("china_term.txt",'w', encoding='utf8') as file:
    for i in china_term:  
        if(i=="行" or i=="列" or i=="" or i==" "):
            continue 
        file.write(i)
        file.write(",")
input()