import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProCard, ProDescriptions, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, message, Space, Tabs, Tag } from 'antd';
import { useState } from 'react';
import request from 'umi-request';
import General   from './General/index';
import Account   from './account/index';
import BankAccount   from './bankAccount/index';

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        width: 64,
        valueType: 'indexBorder',
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        search: false,
    },
    {
        title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
        dataIndex: 'state',
        initialValue: 'all',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
            },
        },
    },
    {
        title: '排序方式',
        key: 'direction',
        hideInTable: true,
        hideInDescriptions: true,
        dataIndex: 'direction',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            asc: '正序',
            desc: '倒序',
        },
    },
    {
        title: '标签',
        dataIndex: 'labels',
        width: 120,
        render: (_, row) => (
            <Space>
                {row.labels.map(({ name, color }) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: '创建时间',
        key: 'since',
        dataIndex: 'created_at',
        valueType: 'dateTime',
    },
    {
        title: 'option',
        valueType: 'option',
        dataIndex: 'id',
        render: (text, row) => [
            <a href={row.url} key="show" target="_blank" rel="noopener noreferrer">
                查看
            </a>,
            <TableDropdown
                key="more"
                onSelect={(key) => message.info(key)}
                menus={[
                    { key: 'copy', name: '复制' },
                    { key: 'delete', name: '删除' },
                ]}
            />,
        ],
    },
];
//https://procomponents.ant.design/playground/curd
export default () => {
    const [type, setType] = useState('general');
    return (
        <ProCard>
            <Tabs activeKey={type} onChange={(e) => setType(e)}>
                <Tabs.TabPane tab="General" key="general" />
                <Tabs.TabPane tab="Bank Account" key="bank_account" />
                <Tabs.TabPane tab="Account" key="account" />
                <Tabs.TabPane tab="User & Permission" key="user_permission" />
                <Tabs.TabPane tab="Application" key="application" />
                {/*<Tabs.TabPane tab="table" key="table" />*/}
                {/*<Tabs.TabPane tab="form" key="form" />*/}
                {/*<Tabs.TabPane tab="descriptions" key="descriptions" />*/}
            </Tabs>
            {type === 'general' && (
                <General />
            )}
            {type === 'bank_account' && (
                <BankAccount />
            )}
            {type === 'account' && (
                <Account />
            )}
            {type === 'user_permission' && (
                <div>user permission 等信息</div>
            )}
            {type === 'application' && (
                <div>application 申请信息，以及callback设置信息</div>
            )}
            {type === 'descriptions' && (
                <ProDescriptions
                    style={{
                        background: '#fff',
                    }}
                    columns={columns as ProDescriptionsItemProps<GithubIssueItem>[]}
                    request={async (params) => {
                        const msg = await request<{
                            data: GithubIssueItem[];
                        }>('https://proapi.azurewebsites.net/github/issues', {
                            params,
                        });
                        return {
                            ...msg,
                            data: msg?.data[0],
                        };
                    }}
                />
            )}
        </ProCard>
    );
};