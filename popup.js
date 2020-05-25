const url_taiwan_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/taiwan_term.txt";
const url_china_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/china_term.txt";
let taiwan_term = [];
let china_term = [];

document.addEventListener('DOMContentLoaded', function (dcle) {
    GetErrorTimes();
    Getcheckbox();

    var Btn_trans = document.getElementById("btn_translate");
    Btn_trans.addEventListener('click', sendMessage2ContentJS);

    var Cbox_find = document.getElementById("checkbox");
    Cbox_find.addEventListener('click', Setcheckbox);


    var Btn_Update = document.getElementById("btn_Update");
    Btn_Update.addEventListener('click', UpdataData);

    var Btn_Update2 = document.getElementById("btn_find");
    Btn_Update2.addEventListener('click', ReadError);
    
    sendMessage2ContentJS2();
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    sendMessage2ContentJS2();
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for(key in changes) {
      if(key === 'error_count') {
        GetErrorTimes();
      }
    }
  });

function ReadError(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "message" });
    });
    
}
//按鈕點選儲存狀態
function Setcheckbox() {
    var Cbox_checked = document.getElementById("checkbox").checked;
    chrome.storage.sync.set({ Cbox_value: Cbox_checked });
}


//初始化取得原本狀態
function Getcheckbox() {
    var Cbox_BB = document.getElementById("checkbox");
    chrome.storage.sync.get('Cbox_value', function (data) {
        Cbox_BB.checked = data.Cbox_value;
    });
}

//跟內容腳本溝通(通知他要做轉換)
function sendMessage2ContentJS() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "trans" });
    });
}
//跟內容腳本溝通(通知他要做尋找錯誤)
function sendMessage2ContentJS2() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "find" });
    });
}


//設定錯誤次數
function GetErrorTimes() {
    var Btn_find = document.getElementById("btn_find");
    chrome.storage.sync.get('error_count', function (data) {
        if(data.error_count){
            Btn_find.innerHTML = "發現了" + data.error_count + "個非本地詞彙";
        }else{
            Btn_find.innerHTML = "發現了" + 0 + "個非本地詞彙";
        }
        
    });
}



function UpdataData() {
    GetData(url_taiwan_term, url_china_term)
    .then(result => {
        taiwan_term = result[0].split(',');
        china_term = result[1].split(',');
        chrome.storage.sync.set({ taiwan_term_data: taiwan_term });
        chrome.storage.sync.set({ china_term_data: china_term });
        document.getElementById("btn_Update").innerHTML = "更新完畢! 共"+taiwan_term.length+"筆資料";
    });
}


async function GetData(url1, url2) {
    const result1 = await fetch(url1)
        .then(res => res.text())

    const result2 = await fetch(url2)
        .then(res => res.text())

    return [result1, result2];
}

