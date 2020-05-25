const url_taiwan_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/taiwan_term.txt";
const url_china_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/china_term.txt";
let taiwan_term = [];
let china_term = [];

var count=0;


chrome.storage.sync.get('FirstUse', function (data) {
    if (data.FirstUse == true) {
        init();
    }else{
        UpdataData();
		chrome.storage.sync.set({ error_count: 0 });
        chrome.storage.sync.set({ FirstUse: true });
    }
});


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
    // console.log("總共有" + count + "錯誤");
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

function UpdataData() {
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