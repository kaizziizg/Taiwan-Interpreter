
chrome.storage.sync.get('Cbox_value', function (data) {
    if (data.Cbox_value == true) {
        Transword();
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "trans") {
            Transword();
        }
    }
);

function test() {
    alert("test");
}

function Find_error() {
    for (var i = 0; i < error_word.length; i++) {
        if (document.body.innerHTML.includes(error_word[i])) {
            count += 1;
        }
    }
    chrome.storage.sync.set({ error_count: count });
    console.log("總共有" + count + "錯誤");
}
function Transword() {
    let error_word = ["編程", "硬件", "軟件", "外設", "分辨率", "屏", "觸控屏", "攝像頭", "模塊", "模擬"];
    let true_word = ["Coding", "硬體", "軟體", "驅動", "解析度", "螢幕", "觸控螢幕", "視訊鏡頭", "模組", "類比"];

    for (var i = 0; i < error_word.length; i++) {
        document.body.innerHTML = document.body.innerHTML.replace(error_word[i], true_word[i])

    }
    chrome.storage.sync.set({ error_count: count });
    
}

