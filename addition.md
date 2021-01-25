[margin-left: auto;为什么可以使的元素靠右](https://segmentfault.com/q/1010000008431088)


#### 多行文字省略

```
.ellipsis {
  position: relative;
  width:100%;
  /*限制最大高度至5行大小*/
  max-height: 8em;
  overflow: hidden;
}
.ellipsis::before {
  content: '...全文';
  /*需调整*/
  width: 60px;
  position: absolute;
  z-index: 1;
  /*需调整*/
  bottom: 3px;
  right: 0;
  
  box-sizing: border-box;
  background-color: white;
}
.ellipsis::after {
  content: '';
  display: inline-block;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: white;
}
```

```
<view class="ellipsis" bindtap="seeDetail" >{{item.content}}</view>
```

#### [js伪元素点击事件实现](https://juejin.im/post/5dafb59ae51d452497603e8e)

> ####  元素本身：pointer-events: none;禁用点击事件, 其伪元素通过pointer-events: auto;启用点击事件，使鼠标只能点击到伪元素

```
<view class="ellipsis" bindtap="seeDetail" >{{item.content}}</view>
```

```js
.ellipsis{
  pointer-events: none;
}

.ellipsis::before {
  pointer-events: auto;
}
```

![]()



#### 水平居中的几种办法

1.flex

2.text-align:center;

3.position:fixed;

```
position:fixed;
left: 50%;
transform: translateX(-50%);
```

#### 垂直居中的几种办法

1.line-height:20px;

2.padding:auto 0;

3.flex
