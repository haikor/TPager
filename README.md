# TPager
Tempermonkey（油猴）插件

自动添加下一页按钮，方便按顺序阅读学习文档，防止跳跃性的学习操作!



## V0.2
脚本泛化，使其具有通用型 。

 - 使用BAT的六大类文档，及雨雀、gitbook等常用的文档进行适配测试。

 - 并默认匹配包含docs等关键字，可能为帮助文档的网页，用户可自行排除。

 - 按左右方向键，可跳转上一篇、下一篇

```

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

```

## V0.1
以Dubbo官方文档为例，实现分页
