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
    word-break: break-all}
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
