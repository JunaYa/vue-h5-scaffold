// 固定的响应格式
interface BaseResponse<T = any> {
  data: T,
  errCode: number
  errMsg: string
	success: boolean
}

type ResponseData<T = any> = Promise<BaseResponse<T>>
