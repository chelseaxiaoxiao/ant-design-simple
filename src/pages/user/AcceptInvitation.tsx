import {Button, Form, Input, Card, Modal} from 'antd';
import styles from './index.less';
import { SelectLang, useIntl, history } from 'umi';
import React from "react";
import Logo from './components/logo'
import {sendPasswordResetMail} from "@/services/ant-design-pro/login";

const AcceptInvitation: React.FC = () => {
    const { token, email } = history.location.query;
    const [form] = Form.useForm();
    const intl = useIntl();


    const onFinish = async (values: any) => {
        console.log(' AcceptInvitation  Success:', values);
        try {
            const data =  await sendPasswordResetMail({ ...values });
            console.log('data data');
            console.log(data);
            if (data.success === true) {
                Modal.info({
                    title: 'Reset password',
                    content: (
                        <div>
                            An email has been sent with instructions on how to reset your password.
                        </div>
                    ),
                    onOk() {
                        // history.push('/user/login')
                    },
                });
            }
        } catch (error) {

        }

    };
    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang />}
            </div>
            <div className={styles.content}>
                <Logo/>
                <Card className={styles.card} >
                    <div> Join payssion hk </div>
                    <div> You've been invited to join this account by <strong>1554334866@qq.com</strong></div>
                    <Form
                        layout='vertical'
                        form={form}
                        requiredMark='optional'
                        onFinish={onFinish}
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
                                        message: 'Please input your E-mail!'
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
                            <Button style={{width: '-webkit-fill-available'}} type="primary" htmlType={"submit"}>Join team</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default AcceptInvitation;