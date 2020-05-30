// ==UserScript==
// @name         TPager
// @namespace    undefined
// @version      0.2
// @description  自动添加下一页按钮，方便按顺序阅读学习文档，防止跳跃性的学习操作!
// @author       teck

// @match        *://cloud.baidu.com/*
// @match        *://ai.baidu.com/*
// @match        *://*.alipay.com/*
// @match        *://*.aliyun.com/*
// @match        *://*.weixin.qq.com/*

// @include       http*://doc*
// @include       http*://help*
// @include       http*://api*
// @include       http*://support*

// @include       */docs/*
// @include       */doc/*

// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var itemsCount = 0;
    var wait = 500;

    function render() {
        var items = document.querySelectorAll("li");
        if (items.length < 10) {
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

        items = Array.from(items).filter(e => e.outerHTML.match("class=\"[^\"]*" + cls + "[^\"]*\""));

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
            div.innerHTML = "<div style='position: fixed;border-radius: 45%;width: 50px;height: 50px;line-height:50px;left: 40%;bottom: 30px;background-color:#eeeeee;text-align:center;z-index:99999;'><a id=teckBack href='javascript:void(0);'>&lt;&lt;</a></div>" + "<div style='position: fixed;border-radius: 45%;width: 50px;height: 50px;line-height:50px;left: 60%;bottom: 30px;background-color:#eeeeee;text-align:center;z-index:99999;'><a id=teckNext href='javascript:void(0);'>&gt;&gt;</a></div>";;
            document.body.appendChild(div);
        }
        itemsCount = items.length;


        var next = document.getElementById("teckNext");
        var back = document.getElementById("teckBack");
        var idx = 0;


        var selectedKeys = ["select", "active", "current", "action"]
        items.forEach(function(item, i) {
            selectedKeys.forEach(
                function(selectedKey, k) {
                    if (item.outerHTML.match("class=\"[^\"]*" + selectedKey + "[^\"]*\"") && item.outerHTML.match("href=[\"'][^\"']{2,}[\"']")) {
                        idx = i;
                    }
                }
            )
        });
        console.log("current idx:" + idx);
        next.onclick = function() {
            idx = idx + 1;
            click(items, back, idx);
        };
        back.onclick = function() {
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
