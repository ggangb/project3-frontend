import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/view/PageHome.vue'


const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/login',
    name: 'PageLogin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageLogin.vue')
  },
  {
    path: '/register',
    name: 'PageRegister',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageRegister.vue')
  },
  {
    path: '/community',
    name: 'PageCommunity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageCommunity.vue')
  },
  {
    path: '/write',
    name: 'PageWrite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageWrite.vue')
  },
  {
    path: '/view/:contentId',
    name: 'PageView',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageView.vue')

  }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    alert('로그인이 필요합니다.')
    // next( {name: 'PageLogin', params: { from: to.name }} );
    next('/login');
  } else {
    next();
  }
});


export default router;