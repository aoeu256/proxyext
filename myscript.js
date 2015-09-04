keywords = [];

/*chrome.extension.sendRequest({"greeting": "keywords"}, function(response) {
		keywords = response.keywords;
	});
});*/
function run() {
	chrome.extension.sendRequest({"greeting": "setproxy"}, function(response) {
			response.keywords.forEach(function(x) {
				var $st = document.getElementById('srchtxt');			
				st.value = x;
				document.getElementsByName('sf1')[0].submit();
				
				run();
			});
	});
}

run();