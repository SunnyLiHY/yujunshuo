import { css } from '@emotion/css';
import { theme } from 'antd';

/**
 * 定制表格的样式
 */
export const useTableStyles = () => {
  const { token } = theme.useToken();

  return {
    ProTable: css`
      .ant-pro-card-body {
        padding-bottom: 0;
      }
    `,
    Pagination: css`
      &.ant-table-pagination.ant-pagination {
        position: sticky;
        z-index: 100;
        bottom: 0;
        padding: 16px 0;
        margin: 0;
        background-color: ${token.colorBgContainer};
        border-top: 1px solid ${token.colorBorder};
      }
    `,
  };
};
