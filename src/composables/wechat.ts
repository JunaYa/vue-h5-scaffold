import { useScriptTag } from '@vueuse/core'
import { getSignature } from '~/apis/modules/wechat'
import type { Signature } from '~/@types/wechat'

interface ShareInfo {
  title: string // 分享标题
  desc: string // 分享描述
  link: string // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
  imgUrl: string // 分享图标
}

export function isWeixinJSBridgeReady(ready: Function) {
  if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke)
    document.addEventListener('WeixinJSBridgeReady', ready, false)

  else
    ready()
}

export function register() {
  useScriptTag(
    'http://res2.wx.qq.com/open/js/jweixin-1.6.0.js',
    // on script tag loaded.
    (el: HTMLScriptElement) => {
    // do something
      wx.ready(() => {
        // config信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。
      })

      wx.error((res) => {
        // config信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的debug模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
      })

      wx.checkJsApi({
        jsApiList: ['chooseImage'], // 需要检测的 JS 接口列表，所有 JS 接口列表见附录2,
        success(res) {
          // 以键值对的形式返回，可用的 api 值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        },
      })
    },
  )
}

export function wxconfig() {
  getSignature().then((res: Signature) => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
      // 参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名，见附录1
      jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideAllNonBaseMenuItem', 'chooseImage', 'uploadImage', 'getLocalImgData', 'previewImage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    // 增加错误监听
    wx.error((_err) => {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  })
}

export function shareFriend(info: ShareInfo) {
  if (!wx)
    return

  wx.ready(() => { // 需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
      ...info,
      success() {
        // 设置成功
      },
    })
  })
}

export function shareTimeline(info: ShareInfo) {
  if (!wx)
    return

  wx.ready(() => { // 需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData({
      ...info,
      success() {
        // 设置成功
      },
    })
  })
}
