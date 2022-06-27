// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */


export async function currentUser(options?: { [key: string]: any }) {
  //return request<{ data: API.CurrentUser; }>('/api/currentUser', {
  console.log('currentUsercurrentUser options')
  console.log(options)
  return request<{ data: API.CurrentUser; }>('/v1/current_user', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization':`Bearer ${localStorage.getItem('token')}`
    },
    // ...(options || {}),
  });
}
export async function currentAccount(body: API.SelectAccountParams, options?: { [key: string]: any }) {
  return request<{ data: API.Permissions; }>('/v1/select_account', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'authorization':`Bearer ${localStorage.getItem('token')}`
    },
    data: body,
     ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  //return request<API.LoginResult>('/api/login/account', {
  console.log('api login')
  console.log(body)
  return request<API.LoginResult>('/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
