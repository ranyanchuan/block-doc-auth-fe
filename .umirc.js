import {resolve} from 'path';

export default {

  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {path: '/', redirect: '/find'},
        {path: '/find', component: './find/components/'},
        {path: '/home', component: './home/components/'},
        {path: '/activiti-manager', component: './activiti-manager/components/'},
        {path: '/404', component: './404'},
        {path: '/403', component: './403'},
        {path: '/500', component: './500'},
      ]
    }
  ],


  plugins: [
    ['umi-plugin-react', {
      default: 'zh-CN',
      antd: true,
      dva: {
        immer: true,
      },
      dynamicImport: false,
      title: '区块链文档预览',
      dll: false,

      // routes: {
      //   exclude: [],
      // },
      hardSource: false,
    }],
  ],


  alias: {
    components: resolve(__dirname, 'src/components/'),
    node_modules: resolve(__dirname, 'src/node_modules/'),
    utils: resolve(__dirname, 'src/utils'),
    assets: resolve(__dirname, 'src/assets'),
  },


  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },

  },
};
