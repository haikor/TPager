// ==UserScript==
// @name         TPager
// @namespace    undefined
// @version      0.2
// @description  自动添加下一页按钮，方便按顺序阅读学习文档，防止跳跃性的学习操作!
// @author       teck
// @match        *://dubbo.apache.org/*
// @match        *://opendocs.alipay.com/*
// @match        *://developers.weixin.qq.com/*
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
            div.innerHTML = "<div style='position: fixed;border-radius: 40%;width: 60px;height: 30px;left: 40%;bottom: 20px;background-color:#eeeeee;text-align:center;'><a id=teckBack href='javascript:void(0);'>&lt;&lt;</a></div>" + "<div style='position: fixed;border-radius: 40%;width: 60px;height: 30px;left: 60%;bottom: 20px;background-color:#eeeeee;text-align:center;'><a id=teckNext href='javascript:void(0);'>&gt;&gt;</a></div>";;
            document.body.appendChild(div);
        }
        itemsCount = items.length;


        var next = document.getElementById("teckNext");
        var back = document.getElementById("teckBack");
        var idx = 0;


        var selectedKeys = ["select", "active", "current"]
        items.forEach(function(item, i) {
            selectedKeys.forEach(
                function(selectedKey, k) {
                    if (item.outerHTML.match("class=\"[^\"]*" + selectedKey + "[^\"]*\"")) {
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
            var item = items.item(idx);
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

    setTimeout(render, wait);
})();
