#### 移动端页面（响应式,兼容 pc）
1. 学会 media query
2. 学会要设计图（没图不做）
实在要做也行，丑可别怪我
3. 学会隐藏元素
4. 手机端要加一个 meta
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
5. 手机端的交互方式不一样
> 没有 hover
> 有 touch 事件(在PC上，按下鼠标键模拟touchstart,按住鼠标键并拖动模拟touchmove,松开鼠标键表示touchend)
> 没有 resize
> 没有滚动条
    
#### 不用 file 协议怎么打开 html    
* 安装
```
npm i -g http-server
```
* 使用
```
http-server -c-1
```
#### 非响应式(后端)
```
if deviceType='mobile'
    render　'mobile_index.html'
else
    render 'pc_index.html'
```

