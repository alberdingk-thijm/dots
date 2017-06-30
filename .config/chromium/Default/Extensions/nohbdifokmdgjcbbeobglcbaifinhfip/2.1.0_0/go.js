(function (){
    chrome.tabs.getCurrent(function(tab){
        chrome.tabs.update(tab.id, {
            'url': 'chrome://apps',
			'selected': true
        });
    });
})();