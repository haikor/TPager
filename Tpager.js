// ==UserScript==
// @name         TPager
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动添加下一页按钮，让学习文档按顺序打开!
// @author       teck
// @match        *://dubbo.apache.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function render(){
    document.body.innerHTML=document.body.innerHTML
        +"<div style='position: fixed;border-radius: 40%;width: 60px;height: 30px;left: 40%;bottom: 20px;background-color:#eeeeee;text-align:center;'><a id=teckBack href='javascript:void(0);'>&lt;&lt;</a></div>"
        +"<div style='position: fixed;border-radius: 40%;width: 60px;height: 30px;left: 60%;bottom: 20px;background-color:#eeeeee;text-align:center;'><a id=teckNext href='javascript:void(0);'>&gt;&gt;</a></div>";
    var next = document.getElementById("teckNext");
    var back = document.getElementById("teckBack");
    var idx = 0;
    var items = document.querySelectorAll("li");
    items.forEach(function(item,i){
        if(item.classList.contains("menu-item-selected"))
        {
            idx=i;
        }
    }
    );
    console.log("current idx:"+idx);
    next.onclick = function(){
        if(items.item(idx+1).children[0].href){
        items.item(idx+1).children[0].click();
        }
        else{
            idx=idx+1;
            next.click();
        }
                             };
    back.onclick = function(){
        if(items.item(idx-1).children[0].href){
        items.item(idx-1).children[0].click();
        }
        else{
            idx=idx-1;
            back.click();
        }
      };
    }

    setTimeout(render,500);


})();