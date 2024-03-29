import request from '@/utils/request'
import Qs from 'qs'

export function listOrder(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function aftersaleList(query) {
  //会员售后列表
  return request({
    url:'/aftersale/list',
    method:'get',
    params:query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}
export function aftersaledetail(id) {
  //会员售后详情
  return request({
    url:'aftersale/detail',
    method:'get',
    params:{id}
  })
}

export function detailOrder(id) {
  return request({
    url: '/order/detail',
    method: 'get',
    params: { id }
  })
}

export function shipOrder(data) {
  return request({
    url: '/order/ship',
    method: 'post',
    data
  })
}

export function refundOrder(data) {
  return request({
    url: '/order/refund',
    method: 'post',
    data
  })
}

export function replyComment(data) {
  return request({
    url: '/order/reply',
    method: 'post',
    data
  })
}
export function refund(data) {
  //确认退款
  return request({
    url: '/aftersale/refund ',
    method: 'post',
    data
  })
}
export function acceptApi(data){
  //确认退款
  return request({
    url: '/aftersale/update',
    method: 'post',
    data
  })
}
export function getOrderTracesByJson(query){
  //物流信息查询
  return request({
    url: '/logistics/getOrderTracesByJson',
    method: 'get',
    params:query
  })
}
