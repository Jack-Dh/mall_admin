import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/userlist',
    method: 'get',
    params: query
  })
}
export function gradesave(data) {
  //保存会员规则等级信息
  return request({
    url:'/user/gradesave',
    method:'post',
    data
  })
}
export function gradelist() {
  //保存会员规则等级信息
  return request({
    url:'/user/gradelist',
    method:'get',

  })
}
export function marketlist() {
  //积分策略信息查询
  return request({
    url:'/user/marketlist',
    method:'get',

  })
}

export function integrallist() {
  //积分获取查询
  return request({
    url: '/user/integrallist',
    method: 'get',
  })
}
export function integralsave(data) {
  //积分获取保存
  return request({
    url:'/user/integralsave',
    method:'post',
    data
  })
}





export function marketsave(data) {
  //积分策略信息保存
  return request({
    url:'/user/marketsave',
    method:'post',
    data

  })
}

export function listAddress(query) {
  return request({
    url: '/address/list',
    method: 'get',
    params: query
  })
}

export function listCollect(query) {
  return request({
    url: '/collect/list',
    method: 'get',
    params: query
  })
}

export function listFeedback(query) {
  return request({
    url: '/feedback/list',
    method: 'get',
    params: query
  })
}

export function listFootprint(query) {
  return request({
    url: '/footprint/list',
    method: 'get',
    params: query
  })
}

export function listHistory(query) {
  return request({
    url: '/history/list',
    method: 'get',
    params: query
  })
}

