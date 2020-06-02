const url_taiwan_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/taiwan_term.txt";
const url_china_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/china_term.txt";
let taiwan_term = [];
let china_term = [];

document.addEventListener('DOMContentLoaded', function (dcle) {
    BtnErrorMessageSet();
    FindError();
    Getcheckbox();
    var Btn_trans = document.getElementById("btn_translate");
    Btn_trans.addEventListener('click', TransWord);

    var Btn_find = document.getElementById("btn_find");
    Btn_find.addEventListener('click', AlertShow);

    var btn_Update = document.getElementById("btn_Update");
    btn_Update.addEventListener('click', UpdateData);

    var Cbox_find = document.getElementById("checkbox");
    Cbox_find.addEventListener('click', Setcheckbox);
});

//按鈕點選儲存狀態
function Setcheckbox() {
    var Cbox_checked = document.getElementById("checkbox").checked;
    chrome.storage.sync.set({ AutoTrans: Cbox_checked });
	if(document.getElementById("checkbox").checked){
		var btn_Update = document.getElementById("btn_Update");
		btn_Update.innerHTML="注意!\n轉譯有可能導致網頁不正常加載";
	}
}


//初始化取得原本狀態
function Getcheckbox() {
    var Cbox_BB = document.getElementById("checkbox");
    chrome.storage.sync.get('AutoTrans', function (data) {
        Cbox_BB.checked = data.AutoTrans;
    });
}

function TransWord(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "TransWord"},function(response){
            return true;
        });
    });
}

function FindError(){
    chrome.storage.sync.set({ BtnErrorMessage: "尋找錯誤中" });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "FindError"},function(response){
            return true;
        });
    });
}

function AlertShow(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "ShowError"},function(response){
            // alert(response.status);
        });
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        if (key === 'BtnErrorMessage') {
            BtnErrorMessageSet();
        }
    }
});

function BtnErrorMessageSet() {
    var Btn_find = document.getElementById("btn_find");
    chrome.storage.sync.get('BtnErrorMessage', function (data) {
        if (data.BtnErrorMessage) {
            Btn_find.innerHTML = data.BtnErrorMessage;
        }
    });
}


function Send() {
    // 從擴充套件向 contentScript 發送訊息
    // tabs.sendMessage(<tabId>, <message>, callback<response>)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "hello","message2": "world" },function(response){
            alert(response.status);
        });
    });
}



function UpdateData() {
    GetData(url_taiwan_term, url_china_term)
        .then(result => {
            taiwan_term = result[0].split(',');
            china_term = result[1].split(',');
            chrome.storage.sync.set({ taiwan_term_data: taiwan_term });
            chrome.storage.sync.set({ china_term_data: china_term });
            btn_Update.innerHTML="更新完畢 共"+taiwan_term.length+"筆資料";
        });
}

async function GetData(url1, url2) {
    const result1 = await fetch(url1)
        .then(res => res.text())

    const result2 = await fetch(url2)
        .then(res => res.text())

    return [result1, result2];
}