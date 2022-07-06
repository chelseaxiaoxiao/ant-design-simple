import {Button, Form, Input, Card, Modal} from 'antd';
import styles from './index.less';
import { SelectLang, useIntl, history } from 'umi';
import React from "react";
import Logo from './components/logo'

const ConfirmEmail: React.FC = () => {
    const { token, email } = history.location.query;

    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang />}
            </div>
            <div className={styles.content}>
                <Logo/>
                <Card className={styles.card} >
                    <div> this email is verified </div>
                    <div> You're all set, { email } was already verified.</div>
                    <Button style={{width: '-webkit-fill-available'}} type="primary" htmlType={"submit"}>Continue to Dashboard</Button>
                </Card>
            </div>
        </div>
    );
};

export default ConfirmEmail;