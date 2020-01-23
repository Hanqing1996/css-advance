> padding:里面。margin:外面 
```
let {height} = el.getBoundingClientRect()
el.style.height = 0
el.getBoundingClientRect() // 浏览器会自动合并height的设置，因此加此一行计算height高度使得上一行代码生效
el.style.height = `${height}px`
```
> span 内含空格，可能导致文字无法居中，此时应该使用flex居中
```
<span class="item">
222
</span>
```
![](/images/1.jpg)
* 浮动布局：导航栏横向布局
```
.clearfix:after{content: '';display: block;clear: both;}
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
    * 移动端没有 hover;
    * 移动端不监听click事件,只监听touch 事件
    * 移动端没有滚动条
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
* 设置进度条:![](/images/17.jpg) 
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
* use-select 避免用户在点击过快时选中文字（点击和选中是两个不同的操作，应该正交）
```
.g-nav {
    ......
    user-select: none;
}
```
* Icon旋转:![](/images/icon.gif)
```
<span class="g-sub-nav-icon" :class="{open}">
    <Icon name="right"></Icon>
</span>
```
```
>.g-sub-nav-icon{
    transition: transform 250ms;
    &.open {
        transform: rotate(180deg);/*left->right*/
    }
```
* 内联元素不对齐
```
.wrapper{
    vertical-align:middle
}
```
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
* min-width和width的区别
![](/images/25.jpg)
```
span{
    min-width:20px
}
``` 
![](/images/26.jpg)
```
span{
    width:20px
}
``` 

