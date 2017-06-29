chrome.extension.sendRequest({action:"js_blacklist",url:document.location.href},function(b){
                              if(b.ua_string && b.ua_string!=""){
                                document.addEventListener("beforeload", function(e){
                                  Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return (b.append_to_default_ua?navigator.userAgent+" "+b.ua_string:b.ua_string); } });
                                  Object.defineProperty(window.navigator, 'vendor', { get: function(){ return b.vendor; } });
                                  if (b.platform) {
                                    Object.defineProperty(window.navigator, 'platform', { get: function(){ return b.platform; } });
                                  }
                                },true);
                                var a=document.createElement("script");
                                a.type="text/javascript";
                                a.innerText+="Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return '" + (b.append_to_default_ua?navigator.userAgent+' '+b.ua_string:b.ua_string) + "'; } });";
                                a.innerText+="Object.defineProperty(window.navigator, 'vendor', { get: function(){ return '" + (b.vendor) + "'; } });";
                                if(b.platform){
                                  a.innerText+="Object.defineProperty(window.navigator, 'platform', { get: function(){ return '" + (b.platform) + "'; } });";
                                }
                                document.documentElement.insertBefore(a, document.documentElement.firstChild)
                              }
                            });