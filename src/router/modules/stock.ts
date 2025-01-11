import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/stock',
    name: 'Stock',
    redirect: '/stock/stock_basic',
    component: Layout,
    meta: {
      title: '数据挖掘',
      icon: renderIcon(TableOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'stock_basic',
        name: 'stock_basic',
        meta: {
          title: '基础列表',
        },
        component: () => import('@/views/stock/stock_basic/index.vue'),
      },
      {
        path: 'stock_basic2',
        name: 'stock_basic2',
        meta: {
          title: '基础列表2',
        },
        component: () => import('@/views/stock/stock_basic/index.vue'),
      },
    ],
  },
];

export default routes;
