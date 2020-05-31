# TPager
Tempermonkey（油猴）插件

自动添加下一页按钮，方便按顺序阅读学习文档，防止跳跃性的学习操作!



## V0.2
脚本泛化，使其具有通用型
使用BAT的六大类文档进行适配测试，并默认匹配可能的文档网页，用户可自行排除

```
// @match        *://cloud.baidu.com/doc/*
// @match        *://ai.baidu.com/ai-doc/*
// @match        *://opendocs.alipay.com/*
// @match        *://help.aliyun.com/*
// @match        *://pay.weixin.qq.com/*
// @match        *://developers.weixin.qq.com/*

// @include       http*://doc*
// @include       http*://help*
// @include       http*://api*
// @include       http*://open*
// @include       http*://support*

// @include       */docs/*
// @include       */doc/*
```

## V0.1
以Dubbo官方文档为例，实现分页
