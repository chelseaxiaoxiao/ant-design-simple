import {Button, Form, Input, Card, Modal} from 'antd';
import styles from './index.less';
import { SelectLang, useIntl, history } from 'umi';
import React from "react";
import Logo from './components/logo'
import { sendPasswordResetMail} from "@/services/ant-design-pro/login";




const PasswordForget: React.FC = () => {
    const [form] = Form.useForm();
    const intl = useIntl();


    const onFinish = async (values: any) => {
        console.log(' PasswordForget  Success:', values);
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
                        <Form.Item>
                            <Button style={{width: '-webkit-fill-available'}} type="primary" htmlType={"submit"}>Continue</Button>
                        </Form.Item>
                        <Form.Item style={{ margin: '0 auto', textAlign: 'center' }}>
                            <span>Remember your password?  <a href="/user/login"> Log in</a></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default PasswordForget;