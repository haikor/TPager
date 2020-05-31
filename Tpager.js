// ==UserScript==
// @name         TPager
// @namespace    https://github.com/haikor/TPager
// @version      0.2
// @description  自动添加下一页按钮，方便按顺序阅读学习文档，防止跳跃性的学习操作!
// @author       teck

// @match        *://cloud.baidu.com/doc/*
// @match        *://ai.baidu.com/ai-doc/*
// @match        *://opendocs.alipay.com/*
// @match        *://help.aliyun.com/*
// @match        *://pay.weixin.qq.com/*
// @match        *://developers.weixin.qq.com/*
// @match        *://www.yuque.com/*
// @match        *://docs.gitbook.com/*

// @include       http*://doc*
// @include       http*://help*
// @include       http*://api*
// @include       http*://open*
// @include       http*://support*

// @include       */docs/*
// @include       */doc/*
// @include       */help/*
// @include       */support/*

// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var itemsCount = 0;
    var wait = 500;
    var minItem = 10;
    var debuggerItem = "";
    var selectedKeys = ["select", "active", "current","action","on","selected","navButtonOpened"]

    function render() {
        var items = FilterItems();

        if (document.getElementById("teckNext")) {
            if (items.length == itemsCount) {
                //页面元素没变
                // 提高点效率，越等越久
                wait = Math.min(wait + 100, 10000);
                setTimeout(render, wait);
                return;
            } else {
                //页面变了，检测变快
                wait = 500;
            }
        } else {
            var div = document.createElement("div");
            div.innerHTML
                = "<div style='filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;position: fixed;border-radius: 45%;width: 50px;height: 50px;line-height:50px;left: 40%;bottom: 30px;background-color:#eeeeee;text-align:center;z-index:99999;'><a id=teckBack href='javascript:void(0);'>&lt;&lt;</a></div>"
                + "<div style='filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;position: fixed;border-radius: 45%;width: 50px;height: 50px;line-height:50px;left: 60%;bottom: 30px;background-color:#eeeeee;text-align:center;z-index:99999;'><a id=teckNext href='javascript:void(0);'>&gt;&gt;</a></div>";;
            document.body.appendChild(div);
        }
        itemsCount = items.length;


        var next = document.getElementById("teckNext");
        var back = document.getElementById("teckBack");

        var idx = GetCurrentIdx(items);

        next.onclick = function() {
            items = FilterItems();
            idx = GetCurrentIdx(items);
            idx = idx + 1;
            click(items, back, idx);
        };
        back.onclick = function() {
            items = FilterItems();
            idx = GetCurrentIdx(items);
            idx = idx - 1;
            click(items, back, idx);
        };

        function click(items, btn, idx) {
            var item = items[idx];
            if (item && !item.href) {
                var oldItem = item;
                item = item.querySelector("a");
                if (!item) {
                    //整个节点没a，点击下，兼容异步展开
                    if (oldItem.children.length > 0) {
                        oldItem.children[0].click();
                    } else {
                        oldItem.click();
                    }
                }
            }
            if (item && item.href) {
                item.click();
            } else {
                btn.click();
            }
        }

        function keyCheck(e) {
            var keynum;
            if (window.event) { //IE浏览器下的事件
                keynum = e.keyCode;
            } else { //非IE浏览器下的事件
                keynum = e.which;
            }

            if (keynum == 37) {
                back.click();
            }
            if (keynum == 39) {
                next.click();
            }
        }

        document.onkeydown = keyCheck;

        setTimeout(render, wait);
    }

    function FilterItems(){
        var lis = document.querySelectorAll("li");

            var dds = document.querySelectorAll("dd");
        var items = lis.length>dds.length? lis:dds;

        if (items.length < minItem) {
            items = document.querySelectorAll("a");
        }


        var classes = [];
        items.forEach(function(e) {
            e.classList.forEach(
                function(cls) {
                    classes.push(cls);

                }
            );
            Array.from(e.children).forEach(function(child) {
                        child.classList.forEach(
                            function(c) {
                                classes.push(c);
                            }
                        );
                    });
        });

        var cls = GetArrayMost(classes)[0];

        items = Array.from(items).filter(e => (e.outerHTML.match("class=\"[^\"]*" + cls + "[^\"]*\"")
                                        || e.innerHTML.match("href")
                                        && e.innerText.length<20)
                                        && e.innerHTML.indexOf('<ul>')==-1
                                        );
        return items;
    }

    function GetCurrentIdx(items){
        var idx = 0;
        items.forEach(function(item, i) {
            selectedKeys.forEach(
                function(selectedKey, k) {
                    if(debuggerItem && item.outerHTML.indexOf(debuggerItem)>-1){
                        debugger
                    }

                    if (item.outerHTML.match("class=\"[^\"]*(\\b|-)\\b"+selectedKey+"(\\b|-)[^\"]*\"")
                       ) {
                        if(item.outerHTML.match("href=[\"'][^\"']{2,}[\"']")
                        && !item.outerHTML.match("href=[\"']javascript.*[\"']")
                        && !item.outerHTML.match("href=[\"']#.*[\"']")){
                        idx = i;
                        }
                    }
                }
            )
        });
        console.log("current idx:" + idx);
        return idx;
    }

    function GetArrayMost(arr) {
        var arrMap = new Map();
        var key = arr[0],
            value = 1;
        arr.forEach((item, index) => {
            if (arrMap.get(item) !== undefined) {
                let num = arrMap.get(item);
                arrMap.set(item, ++num);
            } else {
                arrMap.set(item, 1);
            }
            if (arrMap.get(item) > value) {
                key = item;
                value = arrMap.get(item);
            }
        });
        return [key, value];
    }

    setTimeout(render, wait);
})();
