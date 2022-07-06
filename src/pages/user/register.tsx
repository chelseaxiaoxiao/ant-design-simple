import {Button, Form, Input, Card, Modal, message} from 'antd';
import styles from './index.less';
import { SelectLang, useIntl } from 'umi';
import React from "react";
import Logo from './components/logo'
import { register } from "@/services/ant-design-pro/login";
import { history } from "@@/core/history";

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const intl = useIntl();
   // const onFinish = async (values: API.RegisterParams) => {
    const onFinish = async (values: API.RegisterParams) => {
        try {
            const msg =  await register({ ...values });
            console.log('onFinish  onFinish msg')
            console.log(msg)
            if (msg.success === true) {
                Modal.info({
                    title: 'Thanks! One more step is required',
                    content: (
                        <div>
                            We have sent you a confirmation email to your email address with a link to verify your email. Please complete the registration by clicking on the link provided.
                        </div>
                    ),
                    onOk() {
                        history.push('/user/login')
                    },
                });
            }
            console.log('register register register')
        } catch (error) {
            console.log('Register  error error')
            console.log(error)
            // const defaultLoginFailureMessage = intl.formatMessage({
            //     id: 'pages.register.failure',
            //     defaultMessage: '注册失败，请稍后再试！',
            // });
            // message.error(defaultLoginFailureMessage);
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
                    <div className={styles.boxRoot}>
                        <div className={styles.signUpTitle}>
                            <span> Create Your Payssion Account</span>
                        </div>

                    </div>
                    <Form
                        layout='vertical'
                        form={form}
                        requiredMark='optional'
                        onFinish={async (values) => {
                            await onFinish(values as API.RegisterParams);
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
                                        message: 'Please input your username!'
                                    }
                                ]
                            }

                            label="Email"
                        >
                            <Input
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.username.placeholder',
                                    defaultMessage: '用户名: 1554334866@qq.com',
                                })}
                            />

                        </Form.Item>
                        <Form.Item label="Password"
                                   name="password"
                                   rules={[
                                       { required: true, pattern: new RegExp(/(?=.*[a-z_])(?=.*\d)(?=.*[^a-z0-9_])[\S]{8,256}/i, "g"),message: '请输入至少8位的字母、数字、字符组合!'},
                                   ]}
                        >
                            <Input.Password
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.password.placeholder',
                                    defaultMessage: '密码: 24234sadfasdf.',
                                })} />

                        </Form.Item>
                        <Form.Item>
                            <Button style={{width: '-webkit-fill-available'}} type="primary" htmlType="submit">Create Account</Button>
                        </Form.Item>
                        <Form.Item style={{ margin: '0 auto', textAlign: 'center' }}>
                            <span>Have an account?  <a href="/user/login">Sign in</a></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Register;