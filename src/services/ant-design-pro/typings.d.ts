// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    email?: string;
    object?: string;
    id?: string;
    phone?: string;
    status?: string;
    accounts?: object;
  };
  type Account = {
    is_owner?: boolean,
    permissions?: array,
  }
  type CurrentAccount = {
    success?: boolean;
    message?: string;
    data?: Account;
  };
  type SelectAccountParams = {
    account_id?: object;
  };
  type Permissions = {
    success?: boolean;
    message?: string;
    data?: object;
  };

  // type LoginResult = {
  //   status?: string;
  //   type?: string;
  //   currentAuthority?: string;
  // };
  type LoginResultData = {
    access_token?: string;
    token_type?: string;
    expires_in?: int;
  };
  type LoginResult = {
    success?: boolean;
    message?: string;
    data?: LoginResultData;
  };


  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  // type LoginParams = {
  //   username?: string;
  //   password?: string;
  //   autoLogin?: boolean;
  //   type?: string;
  // };
  type LoginParams = {
    email?: string;
    password?: string;
  };

  type RegisterParams = {
    email?: string;
    password?: string;
  };

  type RegisterResult = {
    success?: boolean;
    message?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
