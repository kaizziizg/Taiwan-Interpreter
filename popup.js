

document.addEventListener('DOMContentLoaded', function (dcle) {
    GetErrorTimes();
    Getcheckbox();

    var Btn_trans = document.getElementById("btn_translate");
    Btn_trans.addEventListener('click', sendMessage2ContentJS);

    var Cbox_find = document.getElementById("checkbox");
    Cbox_find.addEventListener('click', Setcheckbox);

});

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
        if (data.Cbox_value == true) {
            sendMessage2ContentJS();
        }
    });
}

//跟內容腳本溝通(通知他要做轉換)
function sendMessage2ContentJS() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "trans" });
    });
    setTimeout(function () {
        GetErrorTimes();
    }, 1000);

}

//設定錯誤次數
function GetErrorTimes() {
    var Btn_find = document.getElementById("btn_find");
    chrome.storage.sync.get('error_count', function (data) {
        Btn_find.innerHTML = "發現了" + data.error_count + "個非本地詞彙";
    });
}


