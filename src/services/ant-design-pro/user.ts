import  request  from './request';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options?: { [key: string]: any }) {
    //return request<{ data: API.CurrentUser; }>('/api/currentUser', {
    console.log('currentUsercurrentUser options')
    console.log(options)
    return request<{ data: API.CurrentUser; }>('/v1/current_user', {
        method: 'GET',
        // headers:{
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'authorization':`Bearer ${localStorage.getItem('token')}`
        // },
        ...(options || {}),
    });
}
export async function currentAccount(body: API.SelectAccountParams, options?: { [key: string]: any }) {
    return request<{ data: API.Permissions; }>('/v1/select_account', {
        method: 'POST',
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

