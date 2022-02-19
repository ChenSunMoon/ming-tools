import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/video/mkv2mp4',
    name: 'mkv2mp4',
    component: () => import('@/views/video/mkv2mp4.vue')
  },
  {
    path: '/ffmpeg',
    name: 'ffmpeg',
    component: () => import('@/views/video/ffmpeg.vue')
  },
  {
    path: '/subtitles/lrc2srt',
    name: 'lrc2srt',
    component: () => import('@/views/subtitles/ltc2srt.vue')
  },
  {
    path: '/voice/unlock-music',
    name: 'unlockMusic',
    component: () => import('@/components/IFrame.vue'),
    props: {
      url: 'unlock-music/index.html'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
