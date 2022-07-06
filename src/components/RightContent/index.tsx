import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import React from 'react';
import { SelectLang, useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import Account from './AccountDropdown';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Account />
            <Switch checkedChildren="开发模式" unCheckedChildren="测试模式" defaultChecked />
            <NoticeIconView />
            <Avatar />
            <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
