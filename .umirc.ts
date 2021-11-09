import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { exact: true, path: '/', component: '@/pages/index' },
  //   { exact: true, path: '/user', component: '@/pages/user' },
  // ],
  fastRefresh: {},
  define: {
    'process.env.apiUrl': 'https://106.55.138.25:8000/',
  },
  proxy: {
    '/api': {
      target: 'https://106.55.138.25:8000/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
