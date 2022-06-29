import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import HeaderContent from '@/components/HeaderContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import {currentUser as queryCurrentUser, currentAccount} from './services/ant-design-pro/api';
import { useModel } from 'umi';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const getCol = function getCol(matrix, col){
  var column = [];
  for(var i=0; i < matrix.length; i++){
    column.push(matrix[i][col]);
  }
  return column;
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
console.log('app app tsx')
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  currentAccount?: API.CurrentAccount;
  loginInfo?: API.LoginResult;
  access_token?: String;
  loading?: boolean;
  fetchUserInfo?: (options?: { [key: string]: any }) => Promise<API.CurrentUser | undefined>;
  fetchAccountInfo?: (options?: { [key: string]: any }) => Promise<API.CurrentAccount | undefined>;
}> {
  const fetchUserInfo = async (options?: { [key: string]: any }) => {
    try {
      const msg = await queryCurrentUser(options);
      if (localStorage.getItem('accountId') === null || localStorage.getItem('accountId') === '' || localStorage.getItem('accountId') === undefined) {
        localStorage.setItem('accountId', msg.data.accounts[0]['id']);
      }
      return  msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchAccountInfo = async (options?: { [key: string]: any }) => {
    if (localStorage.getItem('accountId') === null || localStorage.getItem('accountId') === '' || localStorage.getItem('accountId') === undefined) {
       return undefined;
    }
    try {
      let accountId = localStorage.getItem('accountId');
      const msg = await currentAccount({ "account_id": accountId });
      return  msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    console.log('location location location')
    const currentUser = await fetchUserInfo();
    const currentAccount = await fetchAccountInfo();
    return {
      fetchUserInfo,
      currentUser,
      currentAccount,
      fetchAccountInfo,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    fetchAccountInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
  //  headerRender: () => <HeaderContent />,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.email,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
