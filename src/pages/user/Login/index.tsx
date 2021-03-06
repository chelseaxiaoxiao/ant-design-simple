import Footer from '@/components/Footer';
import { login, currentAccount, currentUser } from '@/services/ant-design-pro/api';

import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs , Card} from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      console.log('login handleSubmit handleSubmit')
      // 登录
      const msg = await login({ ...values });
      if (msg.success === true) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        if (msg.hasOwnProperty('data')) {
          localStorage.setItem('token', msg.data.access_token);//转换成json字符串序列
        }

        const current_user = await currentUser();
        if (current_user.success === true) {
          let accountId = current_user.data.accounts[0]['id'];
          if (localStorage.getItem('accountId') === null || localStorage.getItem('accountId') === '' || localStorage.getItem('accountId') === undefined) {
            localStorage.setItem('accountId', accountId);
          }
          await setInitialState((s) => ({
            ...s,
            currentUser: current_user.data,
          }));

          const current_account = await currentAccount({ 'account_id': accountId });
          if (current_account.success === true) {
            await setInitialState((s) => ({
              ...s,
              currentAccount: current_account.data,
            }));
          }


        }

        message.success(defaultLoginSuccessMessage);

        console.log('login current_user')


       // await fetchUserInfo();


        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>

      <div className={styles.content}>
        <div style={{width: 400, position: 'relative', left: '46%' }}>
          <img alt="logo" src="https://www.payssion.com/static/img/logoadmin.png" />
        </div>

        {/*<Card style={{width: 400, position: 'relative', left: '35%' }} >*/}
        <LoginForm
          // logo={<img alt="logo" src="/logo.svg" />}
         // logo={<img alt="logo" src="https://www.payssion.com/static/img/logoadmin.png" />}
          title="Welcome Back!"
          // subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
         // subTitle="Welcome Back"
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {status === 'error' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          {(
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: 1554334866@qq.com',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: 24234sadfasdf.',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              href="/user/reset_password"
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
            </a>
          </div>
        </LoginForm>
        {/*</Card>*/}

      </div>
      <Footer />
    </div>
  );
};

export default Login;
