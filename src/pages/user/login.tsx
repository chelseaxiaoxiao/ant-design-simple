import {Button, Form, Input, Card, message} from 'antd';
import styles from './index.less';
import { SelectLang, useIntl } from 'umi';
import React, {useState} from "react";
import Logo from './components/logo'
import { currentAccount, currentUser } from "@/services/ant-design-pro/user";
import { login } from "@/services/ant-design-pro/login";
import { history } from "@@/core/history";
import { useModel } from "@@/plugin-model/useModel";

const App: React.FC = () => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const { initialState, setInitialState } = useModel('@@initialState');
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

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
                <Logo/>
                <Card className={styles.card}>
                    <Form
                        layout='vertical'
                        form={form}
                        requiredMark='optional'
                        onFinish={async (values) => {
                            await handleSubmit(values as API.LoginParams);
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={
                                [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your mail!'
                                    }
                                ]
                            }
                            label={intl.formatMessage({
                                id: 'pages.login.mail.label',
                            })}
                        >
                            <Input
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.mail.placeholder',
                                    defaultMessage: '邮箱: 1554334866@qq.com',
                                })}
                            />

                        </Form.Item>
                        <Form.Item label={intl.formatMessage({
                            id: 'pages.login.password.label',
                        })}
                                   name="password"
                                   rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.password.placeholder',
                                    defaultMessage: '密码: 24234sadfasdf.',
                                })} />

                        </Form.Item>
                        <Form.Item>
                            <a href="/user/password_forget" style={{float: 'right'}}>忘记密码?</a>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{width: '-webkit-fill-available'}} type="primary" htmlType={"submit"}>Submit</Button>
                        </Form.Item>
                        <Form.Item style={{ margin: '0 auto', textAlign: 'center' }}>
                            <span>No account yet ?  <a href="/user/register"> Sign up</a></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default App;