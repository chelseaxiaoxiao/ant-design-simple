
import { Space, Select } from 'antd';
import React from 'react';
import styles from './index.less';
import {useModel} from "@@/plugin-model/useModel";

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderLeft: React.FC = () => {
    let className = styles.left;
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState;
    const { Option } = Select;
    const children: React.ReactNode[] = [];
    var defaultValue = ''

    if (currentUser){
        for (let i = 0; i < currentUser.accounts.length; i++) {
            if (defaultValue === '') {
                defaultValue = currentUser.accounts[i].id;
            }
            children.push(<Option key={currentUser.accounts[i].id} value={currentUser.accounts[i].id}>{currentUser.accounts[i].name}</Option>);
        }
    }

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <Space className={className}>
            <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[defaultValue]}
                onChange={handleChange}
            >
                {children}
            </Select>
        </Space>
    );
};
export default GlobalHeaderLeft;
