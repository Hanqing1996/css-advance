## 写 css 的原则
1. 用 scss
2. 不要写死子元素的宽高
3. 按需求写样式
4. 职责分明
5. 可复用组件，不要写 margin（应该在实际场景中设置）
6. 减少 div 嵌套
```
<div class="wrapper">
    <div>//<-这种 div 就是多余的，必须去掉
        <div class="content1"></div>
        <button>deal conten1</button>
    </div>
    <div>
        <div class="content2"></div>
        <button>deal conten2</button>
    </div>
    <div>
        <div class="content3"></div>
        <button>deal conten3</button>
    </div>

<div>
```
以上代码最直观的恶果就是 css。无法简便地处理第一个 button 和最后一个 button

#### px 与 em
* 涉及 padding,margin 应该使用 px ,且应该为4的倍数
* 涉及字体大小，比如 button,label,其 width 应该用 em


#### 全局样式
```
* {margin: 0;padding: 0; box-sizing: border-box;}
*::before{box-sizing: border-box}
*::after{box-sizing: border-box}
h1,h2,h3,h4,h5,h6{font-weight: normal}
```

#### 按需求写样式
* 多行 input
```
<div>
    <div class="input-row">
        <input type="text"/>
    </div>
    <div class="input-row">
        <input type="text"/>
    </div>
    <div class="input-row">
        <input type="text"/>
    </div>
    <div class="input-row">
        <input type="text"/>
    </div>
</div>
```
显然第一行 input 不需要 margin-top。最后一行 input 不需要 margin-bittom
```
.input-row{
    margin:4px,0
    &:first-child{
        margin-top:0;
    }
    &:last-child{
        margin-bottom:0;
    }
}
```
* 同排多个 button
``` 
.form-button{
  @include button-style;
  margin: 0.5em;
  &:first-child{
    margin-left:0;
  }
  &:last-child{
    margin-right: 0;
  }
}
```

#### 职责要分明
> input 之间的间距不应该由 input 实现
```
.form{
  &-row{
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
```
```
<div class="form">
    <div class="form-row">
        <input type="text">
    </div>
    <div class="form-row">
        <input type="password">
    </div>
</div>
```


#### class 类型为 string
> 但是在浏览器中表现为数组

![](/images/class.jpg)
```   
.box1{
    width: 20px;
    height: 30px;
}
.box2{
    border: 5px solid green;
}
.box3{
    background-color: red;
}
```
```
<div class="box1 box2 box3"></div>
```


#### position: absolute（绝对定位）：
> 对象脱离文档流，此时偏移属性参照的是离自身最近的非 static 定位元素（relative,absolute），如果没有这样的元素，则一直回溯到body元素。

![](/images/absolute.jpg)
```
<div class='box'>
  <div class="box2">
    <div class="box3"></div>
  </div>
</div>
```
```
.box{
  width:100px;
  height:100px;
  border:1px solid red;
  position:relative;
}
.box2{
  width:50px;
  height:50px;
  background-color:green;
  position:absolute;
  top:0;
  right:0;
}
.box3{
  width:20px;
  height:20px;
  background-color:yellow;
  position:absolute;
  bottom:0; /* 相对于 box2 的底部定位 */
  right:0;
}
```

#### position: fixed（固定定位）：
> 是一种特殊的绝对定位，也脱离文档流，但偏移定位是以窗口也就是html这个根节点为参考。当滚动浏览器窗口出现滚动条时，对象不会随着滚动。
> 因此用于 sticky 组件中

---
#### 一个元素的 position 变为 absolute/fixed 后，它的 height 会变为0:![](/images/before.jpg)
```
<header>
    <div class="logo">sdasdasssadasdasdas</div>
    <button>菜单</button>
</header>
```
```
header {
    position: relative;
    border:1px solid red;
}

button {
    position: absolute;
    top: 0;
    right: 0
}
```
#### 对此，常用的做法是添加父元素，然后将父元素的高度设置为脱离文档流的元素高度:![](/images/aaa.jpg)
```
<header>
    <div class="logo">sdasdasssadasdasdas</div>
    <div class="wrapper">
        <button>菜单</button>
    </div>
</header>
```
```
header {
    position: relative;
    border:1px solid red;
}

.wrapper{
    height: 24px;/*button 高度*/
}

 button {
    position: absolute;
    top: 0;
    right: 0
}
```
注意：如果是动态设置父元素的高度的话，必须保证"设置父元素的高度"发生在"元素脱离文档流"之前

---
* 有些东西的宽度，我们希望是能随浏览器拖拽发生变化的
> layout,table
* 有些东西的宽度，不应该随浏览器拖拽发生变化的
> input,button 
---
#### 浏览器是有最小宽度限制的
> 比如 chrome 浏览器最小宽度为480px左右
---
#### 文字省略溢出:![](/images/overflow.jpg)
```
div{
    border: 1px solid red;
    /*控制文字不换行*/
    white-space: nowrap;
    /*超过文档宽度的部分隐藏（也就是没有进度条了）*/
    overflow: hidden;
    /*超过文档宽度的部分变成省略号*/
    text-overflow:ellipsis;
}
```
```
<div>11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 11111111111111111111111111111111111111111111111111111111111111111</div>
```
---

#### label 文字两端对齐:![](/images/label.jpg)
> 这种做法虽然实现了效果，但是是不可取的。因为 label 的宽度写死了，如果用户填写内容过长就会出现 bug 
```
  .form-label{
    width:3.5em;
    text-align: justify;
    height: 22px;
    &::after{
      overflow: hidden;
      content:'';
      display: inline-block;
      width: 100%;
    }
  }
```

#### table 实现 form 布局:![](/images/table-form.jpg)
> 这样做的好处在于多排 label 在内容增长的情况下始终保持对齐（没有解决文字两端对齐，事实上这是中国人才会有的习惯）
```
  <table >
    <tr>
      <td>用户名</td>
      <td><input type="text"></td>
    </tr>
    <tr>
      <td>密码</td>
      <td><input type="password"></td>
    </tr>
    <tr>
      <td></td>
      <td>
        <button>提交</button>
        <button>返回</button>
      </td>
    </tr>
  </table>
```



---
#### [line-height 和 font-size 的关系](https://xiedaimala.com/tasks/0e9495f8-df67-44d3-bdd5-ae7e18e6be14/video_tutorials/197fe0f7-625e-4a01-8414-866f2b57b121)
* 取决于字体(font-family)，yahei:1,sc:1.4(由字体设计师决定的)
* "这是字"是一个内联元素(text)
```
// div.eight=text.line-height
div{
    font-size: 20px;
}
```
```
<div>
    这是字
</div>
```
---

#### 流的特点:![](/images/stream.gif)
> 内联元素像水一样流淌在块级元素中，整个块级元素宛如一个大水泡。如果横向拖拽浏览器发生变化,那么块级元素的宽高都将发生变化。
```
<div>
    1111111111
    2222222222
    3333333333
    4444444444
    5555555555
    1111111111
    2222222222
    3333333333
    4444444444
    5555555555
    1111111111
    2222222222
    3333333333
    4444444444
    5555555555
</div>
```
```
div{
    border:1px solid red;
}
```

---
#### div 里有内联元素，div 高度如何计算?
* 如果 div 里面只有一行，那么 div的高度等于内联元素的行高
* 如果 div 里面有多行，那么 div的高度等于各行行高之和（见上）
---



#### 一旦给元素（inline,block）添加了宽度值（比如600px,百分比除外），它就会失去流动性
![](/images/lost.gif)
```
<span>123</span>
```
```
span {
    border:1px solid red;
    display: block;
    width: 600px;
}
```



#### 两个 inline 元素（span,li....）之间如果有任何看不见的字符，都会只表示成一个空格![](/images/inline.jpg)
```
<div> 
    <span>1</span>
    <span>2</span>
</div>
```
---


#### 为什么会有 line-height
> 字体的设计师认为行和行之间应该要有间距，而不同的字体要配合对应的间距才有良好的视觉效果
```
abcfg

xsdsd
```
---

#### 考虑width的问题，不能用定宽思维，要用填充思维
* .small:10% 不代表大.big定宽了，而是多个width为10%的.small堆在一起，才决定了整个.big的宽度
```
<div class="big">
    <div class="small"></div>
    <div class="small"></div>
    <div class="small"></div>
    ......
</div>
```
---

#### css 优先级
> 元素上的style最高
> <style></style> 中越后面越高
> 可以在控制台中查看style，如果某条属性被划去，说明该样式被覆盖了（如果写的css不起效，应该首先排查这一点）
---
#### width px不行，就试试%
这么写可能不奏效
```
<th width="20%">hhh</th>
```
---
#### 去除页面 margin,padding
```
*{
    margin: 0;
    padding:0;
}
```
---
> padding:里面。margin:外面 
---

```
let {height} = el.getBoundingClientRect()
el.style.height = 0
el.getBoundingClientRect() // 浏览器会自动合并height的设置，因此加此一行计算height高度使得上一行代码生效
el.style.height = `${height}px`
```
---
> span 内含空格，可能导致文字无法居中，此时应该使用flex居中
```
<span class="item">
222
</span>
```
---
![](/images/1.jpg)
* 浮动布局：导航栏横向布局
```
.clearfix:after{
/*这三句话都要*/
content: '';
display: block;
clear: both;
}
/*IE6:.clearfix{zoom:1}*/
.nav>li{float:left;}

<ul class="clearfix nav">
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
</ul>
```
---
![](/images/2.jpg)
* 按钮与logo同行且靠右
```
header{position: relative}
header>button{position: absolute;top:0;right:0}

<header>
    <div class="logo"></div>
    <button>菜单</button>
</header>
```
---
![](/images/3.gif)
* [mobile-first](https://xiedaimala.com/tasks/f61cdba2-cea3-4da1-90b6-3f37bd8d6d5b/video_tutorials/5860f76c-534c-4e3f-8f44-5bb8cc4c019f) 
> 这里指的是移动端网页，不是 APP 页面

    * 移动端没有 hover;
    * 移动端大多监听touch 事件（click 也支持，手指点一下就会触发,但原生的 click 在移动端上会有延迟）。注意 PC 端不支持 touch 事件。
    * 在移动端上，常常通过 touchStart,touchEnd 来判定用户滑动方向（对此目前有很多封装好的库，比如 jquery 的 swipe.js,vue 的 vue-swipe）
    * 移动端没有 resize 事件（PC 端页面宽度不一定等于设备宽度，但是移动端面宽度一定等于设备宽度）
    * 移动端没有滚动条（只在 scroll 期间显示原生滚动条，滚动条不可拖拽）
    * 移动端不必设置 scroll 事件，scroll 事件（即滚动条和内容滚动）会由 touch 行为自动触发
    ```
    // 不必设置 onscroll
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
    ```
    * 但是移动端允许开发者在移动端设置 scroll 事件满足特殊要求（比如使用开发者自己制作的滚动条，且只在 scroll 期间显示滚动条，那么接需要在 scroll 回调函数里设置）
    * 移动端所有鼠标事件（比如 mouseup,mousemove,mousedown）全部失效
    * 移动端不用管IE

```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

/*mobile端,button显示,nav默认不显示*/
button{display: block}
.nav{display:none}

/*其它设备,button不显示,nav显示*/
@media (min-width: 600px){
    .nav{display: block}
    .menu{display: none;}
}

<button class="menu">菜单</button>
<ul class="nav">
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
    <li><a href="#">导航</a></li>
</ul>
```


#### 应该有一个PC端的项目，现在想兼容移动端，应该做哪些事?
1. 可能需要增设 touch 事件（比如项目涉及轮播图，希望用户在移动端上能滑动翻阅）
2. 可能需要隐藏滚动条
3. 移动端的 scroll 是由 touch 负责的。那么当 touch 与别的UI交互任务（比如下拉更新）有关时就要注意功能正交，不要混起来


---
#### [flex布局](https://xiedaimala.com/tasks/50bf9d77-093d-4976-977e-1022e52efcdf/video_tutorials/c36ab198-e431-4237-94d0-ae834a9c9ce2)
* flex-wrap
![](/images/5.jpg)
```
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .child{width: 100px;height: 50px;background: white;margin: 13px}
        .parent{border: 1px solid black;background: #ddd;
            display: flex;
            /*反向排列*/
            flex-direction: row;
            /*所有child的width之和超过parent的width,则换行*/
            flex-wrap: wrap;
            width: 700px;
        }
    </style>
</head>__
<body>
<div class="parent">
    <div class="child">1</div><div class="child">2</div>
    <div class="child">3</div><div class="child">4</div>
    <div class="child">5</div><div class="child">6</div>
    <div class="child">7</div><div class="child">8</div>
    <div class="child">9</div><div class="child">10</div>
    <div class="child">11</div><div class="child">12</div>
    <div class="child">13</div><div class="child">14</div>
    <div class="child">15</div><div class="child">16</div>
</div>
```
---
* justify-content
    * space-around:![](/images/7.jpg)   
    * center:![](/images/10.jpg)   
    * flex-start:向主轴起点靠![](/images/9.jpg)   
    * space-between:![](/images/8.jpg)   
```
.child{width: 100px;height: 50px;background: white}
.parent{border: 1px solid black;background: #ddd;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
<div class="parent">
    <div class="child">1</div>
    <div class="child">2</div>
    <div class="child">3</div>
    <div class="child">4</div>
</div>
```
---
* align-items
    * center:![](/images/13.jpg)   
    * flex-start:向副轴起点靠:![](/images/12.jpg)   
    * stretch:将所有child高度伸展至最高child高度:![](/images/11.jpg)   
```
/*使用align-items,parent和child不能写死高度(必须由内容填充)*/
.child{width: 100px;background: white;margin: 10px;border: 1px solid red}
.parent{
    border: 1px solid black;
    display: flex;
    background: #ddd;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
}
<div class="parent">
    <div class="child child1">1 <br/> 1 <br/>1 <br/>1 <br/>1 <br/>1 <br/> </div>
    <div class="child child2">2<br/> 2 <br/>2<br/></div>
    <div class="child child1">3</div>
</div>
```
---
* flex 实现居中
```
.parent{
    display:flex
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
```
* display对inline元素同样有效:
```

```
```
.iconWrapper {
    background-color: red;
    display:flex;
    flex-direction: column;
}
```
---
* flex-grow: 控制child膨胀比例![](/images/14.jpg)   
child自身由内容填充的宽度达不到parent宽度,则需要给child加一个flex-grow
```
.child{background: white;border: 1px solid red;height: 75px;}
.parent{border: 1px solid black;display: flex;background: #ddd;}
.child1{
    /* child1d宽度增大,增大幅度为parent剩余空间的2/(2+1+3) */
    flex-grow: 2;
}
.child2{
    flex-grow: 1;
}
.child3{
    flex-grow: 3;
}

<div class="parent">
    <div class="child child1">11111111111111111 </div>
    <div class="child child2">222222222222</div>
    <div class="child child3">333</div>
</div>
```
---
* 气泡框:![](/images/15.jpg) 
```
.text{font-size:20px; border: 1px solid black;display: inline-block;padding: 5px;
    position: relative;
    max-width: 100px;
    word-break: break-all //单词断行
}
.text::before,.text::after{
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
    left: 10px;
}
.text::before{
    border-top-color: black;
    top: 100%;
}
.text::after{
    border-top-color: white;
    top: calc(100% - 1px);
}

<div class="text">I want to tell you something</div>
```
---
* div内text水平垂直居中:![](/images/16.jpg) 
```
div{
    min-height: 40px;
    line-height: 40px;
    padding:auto 0;
    text-align: center;
    outline:1px solid red;
}
<div>1111111111111111111111111111111111</div>
``` 
---
* 设置滚动条:![](/images/17.jpg) 
```
.items{
    border: 1px solid red;
    width: 100px;
    height: 80px;
    overflow: auto;
}

<div class="items">
    <div class="label">浙江</div>
    <div class="label">吉林</div>
    <div class="label">内蒙</div>
    <div class="label">上海</div>
    <div class="label">天津</div>
</div>
```
---
* 【vue】CSS Transition:![](/images/4.gif) 
```
<div id="demo">
    <button v-on:click="show = !show">
        Toggle
    </button>
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
</div>
```
```
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

/* 从无到有的过程，控制开始时候的状态，必要*/
.fade-enter{
    opacity: 0;
}

/* 从无到有的过程，控制结束时候的状态，必要*/
.fade-leave-to{
    opacity: 0;
}
```
```
new Vue({
    el: '#demo',
    data: {
        show: true
    }
})
```
---
* 【vue】 CSS animation:![](/images/5.gif) 
```
<div id="example-2">
    <button @click="visible = !visible">Toggle show</button>
    <transition name="fade">
        <p v-if="visible">hello</p>
    </transition>
</div>
```
```
.fade-enter-active{
    animation: fade-in 10s;
}
.fade-leave-active {
    animation: fade-in 10s reverse;
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
```
```
new Vue({
    el: '#example-2',
    data: {
        visible: false
    }
})
```
---
* 没有加overflow:hidden之前:![](/images/over.gif) 
```
<g-layout style="overflow:hidden;">
    <g-sider>sider</g-sider>
    <g-layout>
        <g-header>header</g-header>
        <g-contentstyle="height: 348px">content</g-content>
        <g-footer>footer</g-footer>
    </g-layout>
</g-layout>
```
```
    <transition name="slide">
        <div class="sider" :class="siderClass" v-show="visible">
            <div class="hideButton" @click="hideSider">
                <g-button>hide</g-button>
            </div>
            <slot></slot>
        </div>
    </transition>

        data(){
          return {
              visible:true
          }
        }

    /*时长*/
    .slide-enter-active,.slide-leave-active {
        transition: all 10s
    }

    /*从有到无的结束状态，由于只存在visible由true变为false的单一过程，所以不需要设置.slide-leave*/
    .slide-leave-to {
        margin-left: -200px;
    }
```
效果:![](/images/6.gif) 
---
* white-space: nowrap:![](/images/18.jpg)
```
<div class="g-nav">
    <div class="g-nav-item">平台介绍</div>
    <div class="g-sub-nav">
        <div class="g-nav-item">数据接口</div>
        <div class="g-sub-nav-popover">
            <div class="g-nav-item">资讯数据</div>
            <div class="g-nav-item">行业数据</div>
            <div class="g-nav-item">社会数据</div>
        </div>
    </div>
    <div class="g-nav-item">联系方式</div>
</div>
```
```
.g-nav {
    display: flex;
    flex-direction: row;
    border: 1px solid red;
}
.g-nav-item {
    padding: 10px 20px;
}
.g-sub-nav {
    position: relative;
}
.g-sub-nav-popover {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid black;
    white-space: nowrap; /*不许换行，防止文字竖向排列*/
}
```
---
* 扩大导航栏 span 可触面积:![](/images/19.jpg)
```
<div class="nav">
    <!--这里必须是span,不能是div-->
    <span class="nav-item">
        数据接口
    </span>
</div>
```
```
.nav{
    position: relative;
    border: 1px solid red;
}
.nav-item{
    padding: 10px 20px;
    border: 1px solid black;
    display: inline-block;
    vertical-align: top; /*display: inline-block后面一定要加这一句*/
}
```
---
* 多级导航栏:![](/images/20.jpg)
```
<div class="g-nav">
    <div class="g-nav-item ">平台介绍</div>
    <div class="g-sub-nav">
        <div class="g-nav-item">数据接口</div>
        <div class="g-sub-nav-popover">
            <div class="g-nav-item">资讯数据</div>
            <div class="g-nav-item">行业数据</div>
            <div class="g-sub-nav">
                <div class="g-nav-item">社会数据</div>
                <div class="g-sub-nav-popover">
                    <div class="g-nav-item">人口数据</div>
                    <div class="g-nav-item">生产数据</div>
                    <div class="g-nav-item">福利数据</div>
                </div>
            </div>
        </div>
    </div>
    <div class="g-nav-item">联系方式</div>
</div>
```
```
.g-nav {
    display: flex;
    flex-direction: row;
}
.g-nav-item {
    padding: 10px 20px;
}
.g-sub-nav {
    position: relative;
}
.g-sub-nav-popover {
    margin-top: 1px;
    position: absolute;
    background-color:white;/*修改popover背景色*/
    top: 100%;
    left: 0;
    border: 1px solid black;
    white-space: nowrap; /*不许换行，防止文字竖向排列*/
}
.g-sub-nav .g-sub-nav .g-sub-nav-popover{
    margin-left: 8px;
    top: 0%;
    left: 100%;
}
```
---
* ::after为选中项添加不占空间的底边:![](/images/21.jpg)
```
<div class="g-nav">
    <div class="g-nav-item">平台介绍</div>
    <div class="g-nav-item selected">联系方式</div>
    <div class="g-nav-item">数据接口</div>
</div>
```
```
.g-nav {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid red;
}
.g-nav-item {
    padding: 10px 20px;
    position: relative;
}
.selected::after{
     content:'';
     position:absolute;
     left:0;
     bottom: 0px;
     border-bottom:1px solid blue;
     width:100%;
 }

/**
如果要消除after效果，则用
.selected::after{
display:none
}
*/
```
---
* 居中不行浮动凑,儿子不行爸爸动:![](/images/22.jpg)
```
<span class="g-sub-nav-label">
    <span class="title">
        <slot name="title"></slot>
    </span>
    <span class="g-sub-nav-icon">
        <Icon v-if="open" name="left"></Icon>
        <Icon v-else name="right"></Icon>
    </span>
</span>
```
尝试N次，无法让Icon在g-sub-nav-icon中居中，于是......
```
.title{
    display: inline-block;
    min-width: 4em; // 防止title字数过少时"露馅"
    background-color: red;
}

.g-sub-nav-label{
    position: relative;
    >.g-sub-nav-icon{
        position: absolute;
        /*调整姿势，直到看起来达到"居中"的效果*/
        top:30%;
        left: 80%;
    }
}
```
* use-select:避免用户在点击过快时选中文字（点击和选中是两个不同的操作，应该正交）
```
.g-nav {
    ......
    user-select: none;
}
```
---
* 禁止点击:用户鼠标悬浮在图标上时呈现箭头图案（允许点击：呈现光标/小手图案）
```
.currentPage{
    cursor: default;
}
```
---
* 用户鼠标悬浮在图标上时呈现小手图案:
```
.icon{
    cursor: point;
}
```
---
* Icon旋转:![](/images/icon.gif)
```
<span class="g-sub-nav-icon" :class="{open}">
    <Icon name="right"></Icon>
</span>
```
```
>.g-sub-nav-icon{
    display: inline-block;
    vertical-align: middle;
    transition: transform 250ms;
    &.open {
        transform: rotate(180deg);/*left->right*/
    }
```
---
* 对齐内联元素:![](/images/name.jpg)
```
// 对齐 .text 和 .iconWrapper 这两个内联元素
<span class="text">
    {{column.text}}
</span>
<span class="iconWrapper" style="">
    <icon name="up"></icon>
    <icon name="down"></icon>
</span>
```
方法：将两个元素用 div 包裹,然后使用flex对齐:![](/images/up.jpg)
```
<div>
    <span class="text">
        {{column.text}}
    </span>
    <span class="iconWrapper" style="">
        <icon name="up"></icon>
        <icon name="down"></icon>
    </span>
</div>
```
```
.wrapper {
    display: flex;
    align-items: center;
}
```
---
* 用户往nav-item里填了个a标签,怎么修改a标签样式使其与其它nav-item一致:![](/images/23.jpg)
```
<g-nav-item name="introduction"><a href="https://baidu.com">平台介绍</a></g-nav-item>
```
```
// nav-item.vue
.g-nav-item{
    a {
        color: inherit;
        text-decoration: none;
    }
}
```
效果:![](/images/23.jpg)
---
* min-width,max-width:![](/images/3em.jpg)![](/images/9em.jpg)
> box 的宽度变化范围是5em到8em。内容少于5个字时，box宽度为 5em,内容多于8个字时，box宽度为 8em,
```
    <div class="box">
        艾艾艾
    </div>
```
```
.box{
    border: 1px solid red;
    min-width: 5em;
    max-width: 8em;
}
```
---
* 悬浮变蓝:![](/images/hover.gif)
```
&:hover{
    border-color: $blue;
}
```
---
* table:![](/images/table.jpg)
```
<table class="g-table,bordered">
    <thead>
        <tr>
            <th>姓名</th>
            <th>分数</th>
        <tr>
    </thead>
    <tbody>
        <tr>
            <td>乔斯达</td>
            <td>100</td>
        <tr>
        <tr>
            <td>承太郎</td>
            <td>99</td>
        <tr>
        ...
    </tbody>
</table>
```
```
.g-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;

    /*加边框*/
    &.bordered{
        border: 1px solid $grey;
        td,th{
            border: 1px solid $grey;
        }
    }

    /*默认不加边框,除非有 class:bordered*/
    th, td {
        border-bottom: 1px solid $grey;
        text-align: left; // th 默认文字居中
        padding: 8px;
    }
    tbody{
        >tr{
            &:nth-child(odd){
                background-color: $white;
            }
            &:nth-child(even){
                background-color: lighten($grey,10%);  // $grey 加浅10%,加深用 darken
            }
        }
    }
}
```
---
* checkbox:半选: ![](/images/checkbox.jpg)
```
<input type="checkbox" id="checkbox">
document.getElementById('checkbox').indeterminate = true
```
---
* svg 填充颜色:![](/images/svg.jpg)
```
svg {
    fill:$grey;
}
```
---
* 排序按钮交互:![](/images/svg.jpg)
> 上下空
```
<span @click="changeSortRule(column.field)">
    <icon name="up"></icon>
    <icon name="down"></icon>
</span>
```
```
changeSortRule(key){
    let copy=this.orderBy
    // 上->下
    if(copy[key]==='asc'){
        copy[key]='desc'
    // 下->空
    } else if(copy[key]==='desc'){
        copy[key]=true
    // 空->上
    }else{
        copy[key]='asc'
    }
    this.$emit("update:orderBy",copy)
}
```
---
* loading 悬浮居中:![](/images/loading.jpg)
> relative 加于父元素，absolute 加于子元素，切记
```
<div class="tableWrapper">
    <table>
    </table>
    <div :class="{loading}">
        <icon name="loading"></icon>
    </div>
</div>
```
```
.tableWrapper{
    position: relative;

    .loading {
        position: absolute;top: 0;left: 0;
        width: 100%;height: 100%; // 让 .loading "铺"满整个 .tableWrapper
        display: flex;align-items: center;justify-content: center; // flex居中
        background: rgba(255, 255, 255, 0.8); // 设置背景半透明
    }
}
```
---
* table:colspan:![](/images/colspan.jpg)
```
<table>
    <thead>
    <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>单位</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>刘媛媛</td>
        <td>20</td>
        <td>百度</td>
    </tr>
    <tr>
        <td colspan="2">第二格</td>
        <td>第一格</td>
    </tr>
    </tbody>
</table>
```
```
table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid grey;
}

td, th {
    border: 1px solid grey;
}
```
---
* transform:![](/images/tr.jpg)
> transform 表示的是一种状态
```
<div class="div"></div>
```
```
.div{
  width:20px;
  height:20px;
  background-color:red;
  transform:translateX(600%)
}
```
---
* transition:![](/images/trans.gif)
> transition 表示的是一个过程。如果你想实现一个状态到另一个状态的缓慢渐变，你就应该使用 transition
```
<div class="box"></div>
```            
```
.box{
  width:20px;
  height:20px;
  background-color:red;
}

.box{
  /*由当前状态到下一个状态需要1s的时间，速度为匀速，生效属性为 transform*/  
  transition:all 1s linear 
}
```
```
let box=document.querySelector('.box')
let n=0
setInterval(()=>{
  n+=100
  box.style.transform=`translateX(${n}%)`
},1000)
```
> 以下例子中,inpyt 的 bow-shadow 由 "box-shadow:0px 0px 0px 20px fade_out($main-color,1);" 变为 "0px 0px 0px 20px fade_out($main-color,0.1)" 花了10s
![](/images/input.gif)
```
// scss
.input{
  transition: box-shadow 10s;
  box-shadow:0px 0px 0px 20px fade_out($main-color,1);
  &:focus{
    box-shadow: 0px 0px 0px 20px fade_out($main-color,0.1);
  }
}
```
```
<input type='text'/>
```
---
* bow-shadow
> bow-shadow 生成器[](https://www.cssmatic.com/box-shadow)
---
* [涟漪按钮](https://github.com/Hanqing1996/ripple-button):![](/images/ripple.gif)
---
* 调整 z-index 令文字在背景 span 上方
```
.button{
    position: relative;
    z-index: 0;/*这里不可以写成 z-index:auto*/
}
.circle{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: -1;
    background-color: red;
}
```
```
<button class="button"> 按钮 <span class="circle"></span></button>
``` 
---
* Dialog 居中:![](/images/dialog.jpg)
```
.wheel-dialog {
  background: white;
  position: fixed;
  width: 10em;
  height: 10em;
  border-radius: 4px; // border 角度圆滑
  /**
   * 以下三行实现了 Dialog 居中，由于 Dialog 为固定定位，所以不可以用 display
   */
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black,0.5);
  }
}
```
```
<div>
    <div className="wheel-dialog-mask">
    </div>
    <div className="wheel-dialog">
        <header>提示</header>
        <main>{props.children}</main>
        <footer>
            <button>ok</button>
            <button>cancel</button>
        </footer>
    </div>
</div>                
```
> left,top+transform 是很常见的套路。类似的还有：
* Close 按钮位置:![](/images/close.jpg)
```
  dialog-close{
    > svg{
      width: 2em;
      height: 2em;
    }
    position: absolute;
    bottom: 100%;
    left: 100%;
    transform: translate(-50%,50%);
  }
```
```
<div class='dialog-close'}>
    <Icon name='close'></Icon>
</div>
```


---
* box-sizing:border-box
> 在 CSS 盒子模型的默认定义里，你对一个元素所设置的 width 与 height 只会应用到这个元素的内容区。如果这个元素有任何的 border 或 padding ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。
```
<div class="box">
    
</div>
```
```
.box{
    border: 10px solid green;
    width: 100px;
    height: 100px;
    background-color: red;
}
```
> box-sizing:border-box 的作用就是指定 box 的总高/宽度。你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。
```
<div class="box">
    
</div>
```
```
.box{
    border: 10px solid green;
    width: 100px;
    height: 100px;
    background-color: red;
    box-sizing:border-box
}
```
> 但是有一个问题，box-sizing 是无法继承的。如果每个子元素都手动添加 box-sizing: border-box 又过于麻烦
```
<div class="box">
    <div class="box2"></div>
</div>
```
```
.box{
    box-sizing: border-box;
    border: 10px solid green;
    width: 300px;
    height: 300px;
}

// box2 的 width 仍只包括内容区，总宽度为(100+20)px
.box2{
    border: 10px solid blue;
    width: 100px;
    height: 100px;
    background-color: red;
}
```
> 解决方法：使用属性选择器
```
<div class="scope-box">
    <div class="scope-box2"></div>
</div>
```
```
div[class^="scope-"] {
    box-sizing: border-box;
  }
  // 属性选择器不能包括伪类
  div[class^="scope-"]::after {
    box-sizing: border-box;
  }
  div[class^="scope-"]::before {
    box-sizing: border-box;
  }


.scope-box{
    box-sizing: border-box;
    border: 10px solid green;
    width: 300px;
    height: 300px;
}

.scope-box2{
    border: 10px solid blue;
    width: 100px;
    height: 100px;
    background-color: red;
}
```
---
* svg 颜色填充
```
svg{
    width:2em;
    height:2em;
    fill:blue
}
```
```
<div class="box">
    <svg>
        <use xlinkHref=`#close`></use>
    </svg>
</div>
```
> currentColor:svg 的颜色继承父元素的 color
```
.box{
    color:blue
    svg{
        width:2em;
        height:2em;
        fill:currentColor
    }
}
```
---
* Dialog 的最右边按钮 margin-right 应该为0:![](/images/button.jpg)
```
<button>ok</button>
<button>cancel</button>
```
```
// scss
button {
    margin: 2px 4px;
    width: 4em;
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
}
```
---
#### 宽度由内容撑开
> 比如 aside，文字的宽度撑开了 aside 的宽度，而不是一开始就把 aside 的高度写死
```
.aside {
    h2 {
        padding: 8px;
    }
> ul {
    > li {
        padding: 8px 16px;
        min-width: 7em;
    }
 }
}
```
> 比如 content，content 内的元素总高度决定了 content 的高度，而不是一开始就把 content 的高度写死

---
#### flex-drection:row
> 同排元素有同一高度（由最大高度元素决定）。所以事实上只需要设置最多一个元素的高度

---

#### input 标准样式![](/images/input-starand.gif)
```
// scss
.wheel-input{
  border:1px solid #ddd;
  line-height: 22px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: box-shadow 3s;
  box-shadow: 0px 2px 14px -6px fade_out(#1890ff,0.9);
  &:focus{
    outline: none;
    border-color:$main-color ;
    box-shadow: 0px 2px 14px -6px fade_out(#1890ff,0.5);
  }
}
```
```
<input type="text"/>
```
---

#### button 标准样式![](/images/button-s.gif)
```
// scss
$font-size: 14px;
$button-height: 32px;
$border-radius:4px
$border-color-hover: #666;
$border-color: #999;
$button-bg: white;
$button-active-bg:#eee;

.button {
  margin: 1em;
  white-space: nowrap;font-size: $font-size; height: $button-height; padding: 0em 1em;
  border-radius: $border-radius; border: 1px solid $border-color;
  background: $button-bg;
  display: inline-flex; justify-content: center; align-items: center;
  &:hover { border-color: $border-color-hover; }
  &:active { background-color: $button-active-bg; }
  &:focus { outline: none; }
}

```
```
<button>按钮</button>
```
---
#### table 的 css
* td 不能设置 margin，只能设置 padding
* tr 既不能设置 margin，也不能设置 padding

---
#### overflow:auto 和 overflow:scroll 的区别 
* overflow:auto:![](/images/auto.jpg)
> 内容不超出窗口长度情况下不显示滚动条
* overflow:scroll:![](/images/scroll2.jpg)
> 不管内容如何，一定有滚动条
```
<div class='box'></div>
```
```
.box{
  width:100px;
  height:100px;
  border:1px solid red;
  overflow:scroll
}
```

---
#### overflow 在内容为 position:absolute 时依然奏效
:![](/images/hidden.jpg)
```
<div class='box'>
  <div class='content'>123456789101112</div>
</div>
```
```
.box{
  width:52px;
  height:100px;
  border:1px solid red;
  position:relative;
  overflow:hidden
}
.content{
  position:absolute;
  border:1px solid green;
}
```
---
#### scrollHeight
> 获取滚动内容高度

![](/images/scrollheight.jpg)

```
<div class="wrapper">
  <div class="content"></div>
</div>
```
```
.wrapper{
  width:100px;
  height:200px;
  overflow:scroll
}

.content{
  width:100%;
  height:400px;
  background-color:red
}
```
```
const content=document.getElementsByClassName('content')[0]
console.log(content.scrollHeight) // 400px
```
---
* 下拉更新
> 这其实是件挺麻烦的事情，要求如下
1. contentTop为0时，可以下拉更新，但有下拉最大限度
:![](/images/pull1.gif)
2. contentTop不为0时，先下来至contentTop为0，才能进一步下拉更新
:![](/images/pull2.gif)
3. 下拉更新过程中，允许又往上拉
:![](/images/pull3.gif)
4. 下拉更新过程中，往上拉是有限度的，不能超过 content.scrollHeight
:![](/images/pull4.gif)

---
#### scss
* 在某个  scss 文件中引用其他 scss 文件
```
@import '../_helper.scss';
```
* 子元素与父元素有相同的 class 前缀
```
.example-layout {
  width: 100%;
  height: 100%;
  &-header {
    background: $header-footer-color;
  }
```
等价于
```
.example-layout {
  width: 100%;
  height: 100%;
}
.example-layout-header {
    background: $header-footer-color;
}
```
* @mixin 与 @include
> 封装样式以供调用
```
// var.scss
@mixin spin {
  animation: spin 2s infinite linear;
}
```
```
// button.vue
@import "src/var";

.loading{
    @include spin;
}
```
* +
> 如果 .form-input 的前面有 .form-label,则为.form-input添加对应属性
```
.form{
    &-label + &-input{
    margin-left: 4px;
    }
}
```
* >
> 子选择器

```
<div className={'box1'}>
    <div className={'box2'}>child</div>
</div>
```
```
.box1{
  > .box2{
    background: red;
  }
}
```
> 孙代及以下不生效
```
// 无效
<div className={'box1'}>
    <div>
        <div className={'box2'}>child</div>
    </div>
</div>
```
---

#### 控制台样式划线 
> 表示样式不起效果
* 打钩：样式被注释了，所以不起效果
* 没打钩：样式被覆盖了，所以不起效果
---