import ajax from '../ajax'
import type { Signature } from '~/@types/wechat'
const isProduction = import.meta.env.PROD
const domain = isProduction ? 'https://m.hetao101.com/fe-wx-pub/' : 'https://m.testing.hetao101.com/fe-wx-pub/'
/**
 * 获取微信签名
 * @param query
 */
export function getSignature(): Promise<Signature> {
  const config = {
    headers: {
      'Share-Referer': domain,
    },
  }

  return ajax.get(`${domain}/logic/v1/wechat/signature`, config)
}
