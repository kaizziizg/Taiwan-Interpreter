var html_text = document.getElementsByTagName("p");  

let error = ["編程","硬件","軟件","外設","分辨率","屏","觸控屏","攝像頭","模塊","模擬"];
let true_word = ["Coding","硬體","軟體","驅動","解析度","螢幕","觸控螢幕","視訊鏡頭","模組","類比"];

for(var i=0; i<html_text.length;i++){
    for(var i=0; i<error.length;i++){
        document.getElementsByTagName("p")[i].textContent=document.getElementsByTagName("p")[i].textContent.replace(error, true_word);
    }
}


let error_word = ["編程","硬件","軟件","外設","分辨率","屏","觸控屏","攝像頭","模塊","模擬"];
let true_word = ["編碼","硬體","軟體","驅動","解析度","螢幕","觸控螢幕","視訊鏡頭","模組","類比"];
for(var i=0; i<error_word.length;i++){
    document.body.innerHTML = document.body.innerHTML.replace(error_word[i], true_word[i]);
}