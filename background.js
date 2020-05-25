let taiwan_term = []
let china_term = []
const url_taiwan_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/taiwan_term.txt";
const url_china_term = "https://raw.githubusercontent.com/kaizziizg/Taiwan-Interpreter/master/data/china_term.txt";



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {  
    console.log(message);  
    console.log(sender);  
    sendResponse({content: "來自事件腳本的回覆"});  
    UpdataData();
    
});

function GetTaiwanTerm() {
    taiwan_term_get = this.responseText.split(',');
    chrome.storage.sync.set({ taiwan_term_data: taiwan_term_get });
}
function GetChinaTerm() {
    china_term_get = this.responseText.split(',');
    chrome.storage.sync.set({ china_term_data: china_term_get });
}

function UpdataData() {
    

    var taiwan_term_length = 0

    chrome.storage.sync.get('taiwan_term_data', function (data) {
        taiwan_term = data.taiwan_term_data;
    });
    chrome.storage.sync.get('china_term_data', function (data) {
        china_term = data.china_term_data;
    });



    setTimeout(function () {
        console.log("更新完畢");  
        console.log("共"+taiwan_term.length+"筆資料");
    }, 1000);



}