import { createRouter, createWebHistory } from 'vue-router';
import NotesList from '@/components/NotesList.vue';
import Settings from '@/components/Settings.vue';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/notes',
    component: NotesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/notes'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    // Prevent logged-in users from accessing login page
    next('/notes');
  } else {
    next();
  }
});

export default router;
