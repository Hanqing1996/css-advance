#### 没有 css 的 html
* 内容与样式混合
```
<body>
    <center>标题</center>
</body>
```

#### 基础
* margin:外边距
* padding:内边距
* outline:类似 border,但不占位
* position:控制 child 出现在 parent 右下角
``` 
.parent{
    position: relative;
}
.child{
    position: absolute;
    bottom: 0;
    right:0
}
```
* float:让元素浮起来
* display:inline
    * inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行
    * 其宽度随元素的内容而变化。inline元素设置width,height属性无效。
    * inline高度由line-height间接确定的，跟 height无关；
    * inline元素的水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果
    * 但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。
 

#### 两个 div 之间如果有 margin，会发生合并，如何处理
* border
```
<div style="border:1px"></div>
```
* display
```
<div style="display: flex"></div>
or
<div style="display: table"></div>
```

#### 修改 child.margin 导致 parent 与 child 合并，如何处理
* display
```
.parent{
    overflow:hidden;
}
```
* overflow
```
.parent{
    display:inline-block;
}
```

#### li 设置 display=block 会导致小圆点消失

#### 对 {display:inline} 的 child 设置 position: absolute; 会把 child 的 display 改为 block

#### float 影响 inline 元素（文字环绕，不 float）

#### 垂直具中的要点
一定不要把 parent 的高度写死！要撑出 patent 高度

#### 控制台查看元素的 display 值
选中元素->Computed->filter 搜索 display

#### 内联元素
* 字与字之间用基线对齐
* 每种字体有对应的默认line-height（字体大小的多少倍）
* 高度由line-height而不是font-size决定
* 如果 span 的 font-size 为 20px，则
    * 该 span 里面的实际文字大小跟字体有关
    * 该 span 的 line-height 跟字体有关

#### 块状元素的高度由其内部文档流中元素的总高度决定

#### &nbsp;
* 1&nbsp;2
等于
```
1 2
```
* 不同字体,&nbsp;宽度不同

#### word-break:打碎单词
```
div{
word-break:break-all
}

<div>
1
2222222222222222222222222222222222222222
</div>
```

* 多行文本省略:css multi line text ellipsis

#### 文档流
* 文档流中的内联元素从左到右依次排列，如果空间不够，则换一行再从左到右依次排列
* 文档流中的块级元素总是每个另起一行

#### 脱离文档流（计算div高度时不考虑脱离文档流的元素）
* float:left
* position:absolute
    * position:relative 没有脱离文档流，top:10px 没有改变父级div的高度
* position: fixed 可以使元素脱离文档流    

#### height 和 width 不要固定
 * 因为宽高定死之后，如果文字变多，会出现奇怪的样式
 * 因为宽高定死之后，如果用户缩小窗口大小，会出现滚动条，影响体验
 * height 可以用 line-height 和 padding 来撑，这样写更灵活美观
 * width: 100% 再加上 padding 就会撑出父元素之外，很难看
 * 不写死宽高，页面就是响应式的。
 
#### 半透明
```
rgba(255,0,0,0.5);
```
 
#### 堆叠上下文
* 堆叠顺序（从上到下）：定位（相对/绝对）元素>内联元素>浮动元素>块级元素（哪个后出现哪个浮在上面）>border>background
* 同为内联元素，看所在块级元素哪个后出现，后出现的浮在上面
* inline-block 元素与 inline 元素堆叠层次相同
    
    
#### z-index     
* z-index 是定位元素(position:absolute/relative/fixed) 特有的
* 对于定位元素(position:absolute/relative/fixed)：z-index 大的浮在上面
    * z-index相同的情况下，HTML中谁在后面谁浮在上面，且若A浮在B上面，则A的子元素浮在B上面（1级小工>2级经理）
* z-index:auto 与 z-index:0 是不一样的!!!!!
* 令相对定位元素的z-index为负数：background>z-index为负数的相对定位元素
* 父级元素为堆叠上下文（比如定位元素,且设置父级元素z-index不为auto）,则父级元素的子元素若为相对元素且 z-index<0,则该子元素将出现在块级元素与border之间
    * 上面的父级元素称之为堆叠上下文，因为它满足“z-index 值不为 "auto"的 绝对/相对定位”
    
#### 哪些元素是堆叠上下文    
* 根元素 (HTML),
* z-index 值不为 "auto"的 绝对/相对定位，
* 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
* opacity 属性值小于 1 的元素（参考 the specification for opacity），
* transform 属性值不为 "none"的元素
* position: fixed（div style="position: fixed; z-index: auto;" 为堆叠上下文）

#### [photoshop导出图片(8:00)](https://xiedaimala.com/tasks/4b5f0685-337b-4aa9-8032-4b0f8b5b9094/video_tutorials/6e9e6a45-6465-4d83-8ff6-833fe1a5ad2b)

#### [只有psd没有png](https://xiedaimala.com/tasks/4b5f0685-337b-4aa9-8032-4b0f8b5b9094/video_tutorials/f3bf279c-0ead-4d22-9fff-625d83842404)

#### 


