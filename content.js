const url_taiwan_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/taiwan_term.txt";
const url_china_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/china_term.txt";
let taiwan_term = [];
let china_term = [];

chrome.storage.sync.get('Used', function (data) {
    if (data.Used) {
        DataSetter();

    } else {
        FirstInit();
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'ShowError') {
        ShowError();
    } else if (request.message == 'FindError') {
        FindError();
    } else if (request.message == 'TransWord') {
        TransWord();
    }
    sendResponse({ status: "running" });
    return true;
});


function ShowError() {
    chrome.storage.sync.get("AlertErrorMessage", function (data) {
        alert(data.AlertErrorMessage);
    })

}


async function taiwan_term_data() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get("taiwan_term_data", function (data) {
                china_term = data.china_term_data;
                taiwan_term = data.taiwan_term_data;
                resolve(true);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}
async function china_term_data() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get("china_term_data", function (data) {
                china_term = data.china_term_data;
                resolve(true);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}

async function DataSetter() {
    await taiwan_term_data();
    await china_term_data();
    await new Promise(resolve => {
        chrome.storage.sync.get('AutoTrans', function (data) {
            if (data.AutoTrans == true) {
                // console.log("自動轉譯");
                var origin_html = document.body.innerHTML;
                for (var i = 0; i < taiwan_term.length; i++) {
                    if (origin_html.includes(china_term[i])) {
                        origin_html = origin_html.replace(china_term[i], taiwan_term[i]);
                    }
                }
                document.body.innerHTML = origin_html;
            }
        });
        resolve(true);
    });
}



async function FindError() {
    await taiwan_term_data();
    await china_term_data();
    let message = "";
    let count = 0;
    await new Promise(resolve => {
        for (var i = 0; i < china_term.length - 1; i++) {
            if (document.body.innerHTML.includes(china_term[i])) {
                count += 1;
                message = message + china_term[i] + "->" + taiwan_term[i] + "\n";
            }
        }
        resolve(true);
    });
    chrome.storage.sync.set({ BtnErrorMessage: "發現了" + count + "個非本地詞彙" });
    chrome.storage.sync.set({ AlertErrorMessage: message });
}

async function SetData() {
    const result1 = await fetch(url1)
        .then(res => res.text())

    const result2 = await fetch(url2)
        .then(res => res.text())

    return [result1, result2];
}
//======================FirstInit()==============================================
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
//======================FirstInit()==============================================
function TransWord() {
    var origin_html = document.body.innerHTML;
    for (var i = 0; i < taiwan_term.length; i++) {
        if (origin_html.includes(china_term[i])) {
            origin_html = origin_html.replace(china_term[i], taiwan_term[i]);
        }
    }
    document.body.innerHTML = origin_html;
}
