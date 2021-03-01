import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const mainRouters = [
  {
    path: '/',
    name: '命令行',
    redirect: 'home',
    component: require('@/pages').default,
    children: [
      {
        path: 'cmd/param',
        name: 'editParam',
        component: require('@/pages/cmd/eidtParam').default
      },
      {
        path: 'cmd',
        component: require('@/pages/cmd/index').default
      },
      {
        path: 'file/lrcToSrt',
        component: require('@/pages/convert/lrcToSrt').default
      },
      {
        path: 'voice/tts',
        component: require('@/pages/voice/tts').default
      },
      {
        path: 'voice/project',
        component: require('@/pages/voice/project/index').default
      },
      {
        path: 'setting/baidu',
        component: require('@/pages/setting/baidu').default
      },
      {
        path: 'bilibili/prize',
        component: require('@/pages/bilibili/prize').default
      },
      {
        path: 'home',
        component: require('@/pages/home.vue').default
      }
    ]
  }
]
export default new Router({
  routes: [
    ...mainRouters,
    {
      path: '',
      redirect: '/video/download/new'
    }
  ]
})
