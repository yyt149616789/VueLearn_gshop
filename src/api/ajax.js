/*
ajax请求函数模块
返回值：promise对象(异步返回的是 response.data)

异步调用过程：
const response = await ajax()
const result = response.data

封装后函数返回：
const result = await ajax()
 */
import axios from 'axios'

export default function ajax (url, data={}, type='GET') {
  // 参数 resolve, reject 为函数
  return new promise(function (resolve, reject) {
    //执行异步请求
    let promise

    if (type === 'GET') {
      // 准备url query 参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get 请求
      promise = axios.get(url)
    } else {
      // 发送post 请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      //成功后调用 resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败后调用 reject()
      reject(error)
    })
  })


}
