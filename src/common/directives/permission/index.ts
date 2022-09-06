function getStatsPayload(vnode: any): Record<string, any> {
    const payload: Record<string, any> = {}
    for (const k in vnode.props) {
    // 仅上传自定义数据
    // 装饰属性名称
      if (k.includes('stats-'))
        payload[k.replace('stats-', '')] = vnode.props[k]
    }
    return payload
  }
  
  function onTap(el: any, binding: any, vnode: any) {
    // 防抖动，时间间隔默认为 500ms
  
    const DEFAULT_DEBOUNCE_TIME = 500
    const maxDuration = DEFAULT_DEBOUNCE_TIME
    const duration = DEFAULT_DEBOUNCE_TIME
    let timer: ReturnType<typeof setTimeout> | undefined
    let maxTimer: ReturnType<typeof setTimeout> | undefined | null
    const invoke = () => {
      const payload = getStatsPayload(vnode)
      // 上报数据
      track(binding.value, payload)
    }
  
    el.addEventListener('click', (e: any) => {
      e.preventDefault()
      e.stopPropagation()
  
      if (timer)
        clearTimeout(timer)
  
      if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
        if (maxTimer) {
          clearTimeout(maxTimer)
          maxTimer = null
        }
        return invoke()
      }
  
      // Create the maxTimer. Clears the regular timer on invokation
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            clearTimeout(timer)
          maxTimer = null
          invoke()
        }, maxDuration)
      }
      timer = setTimeout(() => {
        if (maxTimer)
          clearTimeout(maxTimer)
        maxTimer = null
        invoke()
      }, duration)
    })
  }
  
  export default function registerTrack(app: any) {
    app.directive('track', {
      // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
      created() {
      // 下面会介绍各个参数的细节
      },
      // 在元素被插入到 DOM 前调用
      beforeMount() {},
      // 在绑定元素的父组件
      // 及他自己的所有子节点都挂载完成后调用
      mounted(el: any, binding: any, vnode: any) {
        // console.log('mounted el', el)
        // console.log('mounted binding', binding)
        // console.log('mounted vnode', vnode)
        // 没有装饰器默认为点击事件
        // 有装饰器，把所有装饰器事件都实现
        onTap(el, binding, vnode)
      },
      // 绑定元素的父组件更新前调用
      beforeUpdate() {},
      // 在绑定元素的父组件
      // 及他自己的所有子节点都更新后调用
      updated() {},
      // 绑定元素的父组件卸载前调用
      beforeUnmount() {
      },
      // 绑定元素的父组件卸载后调用
      unmounted() {},
    })
  }
  