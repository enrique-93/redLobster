/*! jquery.share v2*/
(function($){$.fn.jqSocialSharer=function(options,conf){var settings=$.extend({"popUpWidth":550,"popUpHeight":450,"popUpTop":100,"useCurrentLocation":false},options);return this.each(function(index,value){var social=$.extend({"url":"","image":"","redirect_uri":"","name":"","caption":"","text":"","app_id":""},$(this).data("social")),width=settings.popUpWidth,height=settings.popUpHeight,sHeight=screen.height,sWidth=screen.width,left=Math.round(sWidth/2-width/2),top=settings.popUpTop,url,salidaArr=[],
salidaTxt="",useCurrentLoc=settings.useCurrentLocation;social.url=settings.useCurrentLocation?window.location:encodeURIComponent(social.url);social.image=encodeURIComponent(social.image);social.redirect_uri=encodeURIComponent(social.redirect_uri);social.name=encodeURI(social.name);social.caption=encodeURI(social.caption);social.text=encodeURI(social.text);var config=$.extend(true,{"facebook":{"url":"http://www.facebook.com/sharer.php","campos":{"u":social.url,"t":social.text}},"facebook2":{"url":"http://www.facebook.com/dialog/feed",
"campos":{"link":social.url,"picture":social.image,"name":social.name,"caption":social.caption,"description":social.text,"redirect_uri":social.redirect_uri,"display":"popup","app_id":social.app_id}},"twitter":{"url":"http://twitter.com/share","campos":{"url":social.url,"text":social.text}},"plusone":{"url":"https://plusone.google.com/_/+1/confirm","campos":{"hl":"en","url":social.url}},"pinterest":{"url":"http://pinterest.com/pin/create/button/","campos":{"url":social.url,"media":social.image,"description":social.text}}},
conf);if(!config.hasOwnProperty(social.type))return false;for(var i in config[social.type].campos)if(config[social.type].campos[i])salidaArr.push(i+"="+config[social.type].campos[i]);salidaTxt=config[social.type].url+"?";salidaTxt+=salidaArr.join("&");window.open(salidaTxt,"","left="+left+" , top="+top+", width="+width+", height="+height+", personalbar=0, toolbar=0, scrollbars=1, resizable=1")})}})(jQuery);