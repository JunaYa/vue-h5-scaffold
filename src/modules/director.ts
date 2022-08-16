// 自定义指令
// 全局注册元素自动埋点指令
import registerTrack from '~/common/directives/track'
import Axios from '~/apis/ajax'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  registerTrack(app)
  if (import.meta.env.PROD) {
    // 向追踪服务报告错误
    app.config.errorHandler = (err, instance, info) => {
      track('app-error', {
        err,
        instance,
        info,
      })
    }
  }

  // axios
  app.provide('$https', Axios)
}
