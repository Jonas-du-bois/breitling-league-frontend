import { createRouter, createWebHistory } from 'vue-router'
import TestProgressViewNew from '@/views/TestProgressViewNew.vue'
import TestQuizViewUpdated from '@/views/TestQuizViewUpdated.vue'
import QuizUserJourneyView from '@/views/QuizUserJourneyView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'TestProgress',
    component: TestProgressViewNew,
    meta: { title: 'Test Progression' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Connexion' }
  },
  {
    path: '/test-quiz-updated',
    name: 'TestQuizUpdated', 
    component: TestQuizViewUpdated,
    meta: { title: 'Test Quiz - Version Améliorée' }
  },  {
    path: '/quiz-user-journey',
    name: 'QuizUserJourney',
    component: QuizUserJourneyView,
    meta: { title: 'Parcours Utilisateur Quiz - Test Complet' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Mise à jour du titre de la page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Breitling League` : 'Breitling League'
  next()
})

export default router
