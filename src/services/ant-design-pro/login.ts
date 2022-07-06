// @ts-ignore
/* eslint-disable */
//import { request } from 'umi';
import  request  from './request';
/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
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

/** 账户注册 POST /api/login/account */
export  async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
    return request<API.RegisterResult>('/v1/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 账户激活接口 POST /api/login/account */
export async function activate(body: API.LoginParams, options?: { [key: string]: any }) {
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

/**
 * 找回密码发邮件
 * @param body
 * @param options
 */
export async function sendPasswordResetMail(body: {}, options?: { [key: string]: any }) {
    //return request<API.LoginResult>('/api/login/account', {
    console.log('api reset_password 发送密码页面')
    console.log(body)
    return request('/v1/reset_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

export async function passwordReset(body: {}, options?: { [key: string]: any }) {
    //return request<API.LoginResult>('/api/login/account', {
    console.log('api passwordReset 重置密码')
    console.log(body)
    return request('/v1/reset_password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}