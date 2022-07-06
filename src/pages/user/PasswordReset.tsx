import {Button, Form, Input, Card, Modal} from 'antd';
import styles from './index.less';
import { SelectLang, useIntl } from 'umi';
import React from "react";
import Logo from './components/logo'
import {history} from "@@/core/history";

const PasswordReset: React.FC = () => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const { token } = history.location.query;

    const onFinish = (values: any) => {
        console.log('Success:', values);
        try {
            console.log('handleSubmithandleSubmithandleSubmit')
            Modal.info({
                content: (
                    <div>
                        Thanks, check your email for instructions to reset your password
                        If you haven't received an email in 5 minutes, check your spam or
                        resend
                        .
                    </div>
                ),
                onOk() {},
            });
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
                <Card className={styles.card}>
                    <Form
                        layout='vertical'
                        form={form}
                        requiredMark='optional'
                        onFinish={onFinish}
                    >
                        <Form.Item label="New password"
                                   name="new_password"
                                   rules={[
                                       { required: true, pattern: new RegExp(/(?=.*[a-z_])(?=.*\d)(?=.*[^a-z0-9_])[\S]{8,256}/i, "g"),message: '请输入至少8位的字母、数字、字符组合!'},
                                   ]}
                        >
                            <Input.Password
                                placeholder= 'Password' />

                        </Form.Item>

                        <Form.Item>
                            <Button style={{width: '-webkit-fill-available'}} type="primary" htmlType={"submit"}>Reset Password</Button>
                        </Form.Item>
                        <Form.Item style={{ margin: '0 auto', textAlign: 'center' }}>
                            <span>Remember your password ?  <a href="/user/login"> Log in</a></span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default PasswordReset;