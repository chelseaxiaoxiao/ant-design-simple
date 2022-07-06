import { Button, Form, Input, Card } from 'antd';
import styles from '.././index.less';
import { SelectLang, useIntl } from 'umi';
import React from "react";

const ResePassword: React.FC = () => {
    const [form] = Form.useForm();
    const intl = useIntl();
    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang />}
            </div>
            <div className={styles.content}>
                <div style={{width: 400, position: 'relative', left: '46%' }}>
                    <img alt="logo" src="https://www.payssion.com/static/img/logoadmin.png" />
                </div>
                <Card style={{width: 400, position: 'relative', left: '35%' }} >
                    <Form layout='vertical' form={form}>
                        <Form.Item
                            name="username"
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
                        <Form.Item>
                            <Button style={{width: '-webkit-fill-available'}} type="primary">Reset Password</Button>
                        </Form.Item>
                        <Form.Item style={{ margin: '0 auto', textAlign: 'center' }}>
                            <a href="/user/login">Remember your password? Log in</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ResePassword;