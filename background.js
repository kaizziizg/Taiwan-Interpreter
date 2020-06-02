const url_taiwan_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/taiwan_term.txt";
const url_china_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/china_term.txt";
let taiwan_term = [];
let china_term = [];

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        alert('感謝您安裝此擴充程式\n初次使用請重整或重啟瀏覽器\n轉譯可能導致部分動態網頁失效');
    }
});

chrome.storage.sync.get('taiwan_term_data', function (data) {
    if (!data.taiwan_term_data) {
        FirstInit();
    } else {
        console.log(data.taiwan_term_data);
    }

});
function FirstInit() {
    UpdateData();
    chrome.storage.sync.set({ Used: true });
    console.log("初次使用 已更新數據");
}

function UpdateData() {
    GetData(url_taiwan_term, url_china_term)
        .then(result => {
            taiwan_term = result[0].split(',');
            china_term = result[1].split(',');
            chrome.storage.sync.set({ taiwan_term_data: taiwan_term });
            chrome.storage.sync.set({ china_term_data: china_term });
        });
}

async function GetData(url1, url2) {
    const result1 = await fetch(url1)
        .then(res => res.text())

    const result2 = await fetch(url2)
        .then(res => res.text())

    return [result1, result2];
}



function tranword() {
    chrome.tabs.query({ active: true,currentWindow:true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "TransWord" }, function (response) {
            return true;
        });  
    });
}


function findAndShowError() {
    chrome.tabs.query({ active: true,currentWindow:true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "findAndShowError" }, function (response) {
            return true;
        });  
    });
}


function createMenus() {
    var main = chrome.contextMenus.create({
        "title": "Taiwan term interperter",
        "contexts": ['all'],
        // "onclick": tranword
    });

    var trans = chrome.contextMenus.create({
        "title": "轉譯當前頁面",
        "contexts": ['all'],
        "onclick": tranword,
        "parentId": main
    });

    var find = chrome.contextMenus.create({
        "title": "用語錯誤檢測",
        "contexts": ['all'],
        "onclick": findAndShowError,
        "parentId": main
    });


    // 使用chrome.contextMenus.create的方法回傳值是項目的id
    console.log(main);
    console.log(trans);
    console.log(find);
    
}

createMenus();











