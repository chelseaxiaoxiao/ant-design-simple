
import { Space, Select } from 'antd';
import React from 'react';
import styles from './index.less';
import {useModel} from "@@/plugin-model/useModel";
import {history} from "@@/core/history";

export type SiderTheme = 'light' | 'dark';

const AccountDropdown: React.FC = () => {
    let className = styles.left;
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState;
    const { Option } = Select;
    const children: React.ReactNode[] = [];
    var defaultValue = localStorage.getItem('accountId')

    if (currentUser){
        for (let i = 0; i < currentUser.accounts.length; i++) {
            children.push(<Option key={currentUser.accounts[i].id} value={currentUser.accounts[i].id}>{currentUser.accounts[i].name}</Option>);
        }
    }

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        console.log(value);
        localStorage.removeItem('accountId');
        localStorage.setItem('accountId', value);
        location.reload();

    };
    return (
        <Space className={className}>
            <Select
                bordered={false}
                style={{width: 200, color: 'white'}}
                placeholder="Account"
                defaultValue={[defaultValue]}
                onChange={handleChange}
            >
                {children}
            </Select>
        </Space>
    );
};
export default AccountDropdown;
