let taiwan_term=[];
let china_term=[];
var count=0;

init();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "trans") {
            Transword();
        }
    }
);

function Find_error() {
    
    chrome.storage.sync.get('china_term_data', function (data) {
        china_term = data.china_term_data;
    });
    for (var i = 0; i < china_term.length; i++) {
        if (document.body.innerHTML.includes(china_term[i])) {
            count += 1;
        }
    }
    chrome.storage.sync.set({ error_count: count });
    console.log("總共有" + count + "錯誤");
}

function Transword() {
    chrome.storage.sync.get('taiwan_term_data', function (data) {
        taiwan_term = data.taiwan_term_data;
    });
    chrome.storage.sync.get('china_term_data', function (data) {
        china_term = data.china_term_data;
    });
    for (var i = 0; i < taiwan_term.length; i++) {
        document.body.innerHTML = document.body.innerHTML.replace(china_term[i], taiwan_term[i])
    }
    
    
}
function init(){
    chrome.storage.sync.get('taiwan_term_data', function (data) {
        taiwan_term = data.taiwan_term_data;
    });
    chrome.storage.sync.get('china_term_data', function (data) {
        china_term = data.china_term_data;
    });

    setTimeout(function(){
        Find_error();
        chrome.storage.sync.get('Cbox_value', function (data) {
            if (data.Cbox_value == true) {
                Transword();
            }
        });
    },500);
}

