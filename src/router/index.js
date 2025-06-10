import { createRouter, createWebHistory } from 'vue-router'
import QuizDashboard from '@/views/QuizDashboard.vue'
import QuizPlay from '@/views/QuizPlay.vue'
import QuizTestView from '@/views/QuizTestView.vue'
import LoginView from '@/views/LoginView.vue'
import QuizPage from '@/views/QuizPage.vue'
import QuizReviewPage from '@/views/QuizReviewPage.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: QuizDashboard,
    meta: { title: 'Tableau de Bord - Quiz', requiresAuth: true }
  },
  {
    path: '/quiz/:id/play',
    name: 'QuizPlay',
    component: QuizPlay,
    meta: { title: 'Quiz en Cours', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Connexion' }
  },  {
    path: '/test-quiz',
    name: 'TestQuiz',
    component: QuizTestView,
    meta: { title: 'Test Quiz - Interface Simple', requiresAuth: true }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: QuizDashboard,
    meta: { title: 'Tableau de Bord - Quiz', requiresAuth: true }
  },
  {
    path: '/quiz/:id/play',
    name: 'QuizPlay',
    component: QuizPlay,
    meta: { title: 'Quiz en Cours', requiresAuth: true }
  },
  {
    path: '/quiz/:quizId/start',
    name: 'QuizPage',
    props: true,
    component: QuizPage,
    meta: { title: 'Quiz Interactif', requiresAuth: true }
  },
  {
    path: '/quiz/:quizId/review',
    name: 'QuizReview',
    component: QuizReviewPage,
    props: true,
    meta: { title: 'Révision du Quiz', requiresAuth: true }
  },  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Connexion' }
  },
  {
    path: '/test-quiz',
    name: 'TestQuiz',
    component: QuizTestView,
    meta: { title: 'Sélection de Quiz', requiresAuth: true }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizTestView,
    meta: { title: 'Sélection de Quiz', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Mise à jour du titre de la page et vérification auth
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Breitling League` : 'Breitling League'
  
  // Vérification de l'authentification pour les routes protégées
  if (to.meta.requiresAuth) {
    // TODO: Implémenter la vérification d'authentification
    // Pour le moment, on continue sans vérification
  }
  
  next()
})

export default router
