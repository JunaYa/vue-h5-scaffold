# 元素自动埋点指令

## 为什么要自定义改指令
不用单独写埋点逻辑，省去开发者的工作量，提高开发效率。并且避免了埋点逻辑的错误。
## 怎么使用该指令
```vue
<div v-track="'event_name'" stats-user_id="003" stats-user_name="我呀" />

```vue
<div v-track.stop="'event_name'" stats-user_id="003" stats-user_name="我呀" />

事件类型装饰器
默认 tap，
其他
* stop
* once
* prevent
* capture
* self

## 存留的问题
元素点击事件默认防抖动
如果存在父子节点都有埋点，那么点击子节点时，父节点的埋点也会触发。导致数据有误。
因为在注册事件上增加防抖动，所以对点击事件的元素增加 `event.preventDefault()`，防止默认事件触发, 和 `event.stopPropagation()`，防止冒泡事件触发 无效。所以不得已在指令中再实现一遍防抖动功能

## 其他
另一种方法实现思路隐事埋点，在 app 根页面，对 body 或根节点监听事件，然后触发埋点。