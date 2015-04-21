// ==UserScript==
// @name         Pixiv Helper
// @namespace    http://gitcafe.com/nickdoth/pixiv-helper.user.js
// @version      1.2.1
// @description  P站懒人补丁, 简化收藏和关注等操作.
// @author       nickdoth <nick.doth@gmail.com>
// @match        http://www.pixiv.net/member_illust.php*
// @grant        none
// ==/UserScript==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ajax = function(url, params, method, callback) {
    var xhr = createXhr();
    method = method || 'POST';
    method = method.toUpperCase();
    if (typeof params === 'object') {
        params = parseParamMap(params);
    }


    if (method === "POST") {
        xhr.open(method, url, true);
        xhr.asnyc = true;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    }
    else if (method === "GET") {
        params = params? '?' + params : '';
        xhr.open(method, url + params, true);
        xhr.asnyc = true;
        xhr.send(null);
    }
    
    xhr.onreadystatechange = function() {
    //&& xhr.status == 200
       var err = 0;
       if (xhr.readyState == 4) {
            console.log('AJAX ' + method + ' ' + url + ' ' + xhr.status);
            console.log('Request Body: ' + params);

            if(xhr.status < 400) {
                err = 0;
            }
            else {
                err = 1;
            }

            callback && callback(err, xhr.responseText, xhr.status);
       }
    }

};

ajax.get = function(url, params, callback) {
    if(arguments.length === 2) {
        callback = params;
        params = '';
    }
    return ajax(url, params, 'GET', callback);
}

ajax.post = function(url, params, callback) {
    if(arguments.length === 2) {
        callback = params;
        params = '';
    }
    return ajax(url, params, 'POST', callback);
}


ajax.submitForm = function(form, callback) {
    var paramsList = [];
    for (var n = 0; n < form.length; n++) {
        var input = form[n];
        switch (input.type) {
            case 'checkbox':
                // fall through
            case 'radio':
                input.checked && paramsList.push(input.name + '=' + input.value);
                break;
            case 'text':
                // fall through
            default:
                paramsList.push(input.name + '=' + input.value);
        }
    }

    console.log(form.action, paramsList.join('&'), form.method, callback);
    return ajax(form.action, paramsList.join('&'), form.method, callback);
}



function createXhr() {
    var xhr;
    if (typeof XMLHttpRequest === 'function') { 
        xhr = new XMLHttpRequest();
    }
    else if (typeof ActiveXObject === 'function') { 
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!xhr) { 
        throw new Error('ajax: No avaliable ajax driver found.')
    }
    return xhr;
}

function parseParamMap(map) {
    var paramList = [];
    for (var n in map) {
        paramList.push(n+ '=' + map[n]);
    }

    return paramList.join('&');
}

module.exports = ajax;


},{}],2:[function(require,module,exports){
var ajax = require('./ajax');

var added = false;

$('.add-bookmark').on('click', function(event) {
	if (added) {
		return;
	}

	var btn = event.target;
	event.preventDefault();
	var illustId = pixiv.context.illustRecommendSampleIllust;
	
	$(btn).html('请稍候...');
	added = true;

	ajax.post('bookmark_add.php?id=' + illustId, {
		"mode" : "add",
		"tt" : pixiv.context.token,
		"id" : illustId,
		"type" : "illust",
		"from_sid" : "",

		"comment": "",
		"tag": "",
		"restrict": "1"
	}, function(err, data) {
		alert('作品收藏成功');
		$(btn).removeClass('add-bookmark')
			.addClass('edit-bookmark')
			.addClass('button-on')
			.removeClass('_button')
			.html('编辑收藏');
	})
})


},{"./ajax":1}],3:[function(require,module,exports){
require('./bookmark-button');
require('./ugoira-download');
require('./quick-follow');


},{"./bookmark-button":2,"./quick-follow":4,"./ugoira-download":5}],4:[function(require,module,exports){
var ajax = require('./ajax');

$('body').on('submit', function(event) {
	console.log(event.target)
	var form = $(event.target);
	if (form.find('[name="type"]').val() === 'user') {
		event.preventDefault();
	}
	else {
		return;
	}

	ajax.submitForm(form[0], function(err, data) {
		if (!err) {
			alert('操作完成');
		}
		else {
			alert('系统繁忙');
		}
	});
})


},{"./ajax":1}],5:[function(require,module,exports){
// pixiv.context.ugokuIllustFullscreenData
var bookmarkButton = $('.add-bookmark, .edit-bookmark')[0];
var ugoiraInfo = pixiv.context.ugokuIllustFullscreenData;
var ugoiraButton;

if (ugoiraInfo) {
	ugoiraButton = $('<a class="edit-bookmark _button">ugoira!</a>').insertBefore(bookmarkButton)

	ugoiraButton[0].href = ugoiraInfo.src;
}




},{}]},{},[3]);
