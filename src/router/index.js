import { createRouter, createWebHistory } from 'vue-router'
import PlayzonePage from '@/views/PlayzonePage.vue'
import NoveltyPage from '@/views/NoveltyPage.vue'
import QuizStartPage from '@/views/QuizStartPage.vue'
import QuizPage from '@/views/QuizPage.vue'
import ComponentDemoPage from '@/views/ComponentDemoPage.vue'

const routes = [
  {
    path: '/',
    name: 'Playzone',
    component: PlayzonePage,
    meta: { title: 'Playzone - Breitling League' }
  },
  {
    path: '/novelty',
    name: 'Novelty',
    component: NoveltyPage,
    meta: { title: 'Novelty - Breitling League' }
  },
  {
    path: '/quiz/start/:unitId?/:chapterId?',
    name: 'QuizStart',
    component: QuizStartPage,
    meta: { title: 'Quiz Start - Breitling League' },
    props: true
  },
  {
    path: '/quiz/:unitId?/:chapterId?',
    name: 'Quiz',
    component: QuizPage,
    meta: { title: 'Quiz - Breitling League' },
    props: true
  },
  {
    path: '/component',
    name: 'ComponentDemo',
    component: ComponentDemoPage,
    meta: { title: 'Component Demo - Breitling League' }
  },
  // Redirect all other routes to playzone
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Breitling League'
  next()
})

export default router
