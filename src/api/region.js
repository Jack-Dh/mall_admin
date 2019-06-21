import request from '@/utils/request'

export function listRegion() {
  return request({
    url: '/region/list',
    method: 'get'
  })
}

export function listSubRegion(query) {
  return request({
    url: '/region/clist',
    method: 'get',
    params: query
  })
}

export function createtemplate(data) {
  //新增运费模板
  return request({
    url:'/freight/template/create',
    method:'post',
    data
  })
}
export function createtemplatelist(query) {
  //新增运费模板
  return request({
    url:'/freight/template/list',
    method:'get',
    params:query
  })
}

export function deletetemplate(data) {
  //删除运费模板
  return request({
    url:'/freight/template/delete',
    method:'post',
    data
  })
}
