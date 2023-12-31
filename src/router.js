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
    path: '/find',
    name: 'PageFind',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageFind.vue')
  }, 
  {
    path: '/change',
    name: 'PageChangePw',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageChangePw.vue')
  }, 
  {
    path: '/emailchange',
    name: 'PageChangeEmail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageChangeEmail.vue')
  }, 
  {
    path: '/profile',
    children: [
      {
        path:'',
        name: 'Pageprofile',
        component: () => import(/* webpackChunkName: "about" */ './view/PageProfile.vue'),
      },
      {
        path:'/mypost',
        name: 'PageMyPost',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ './view/PageMyPost.vue'),
      },
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   
  }, 
  
  {
    path: '/result',
    name: 'PageLive',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageLive.vue')
  },
  {
    path: '/community',
    children: [
      {
        path:'',
        name: 'PageCommunity',
        component: () => import(/* webpackChunkName: "about" */ './view/PageCommunity.vue'),
      },
      {
        path: '/view/:contentId',
        name: 'PageView',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ './view/PageView.vue'),
      },
      {
        path: '/write',
        name: 'PageWrite',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './view/PageWrite.vue')
      },
      {
        path: '/community/update/:contentId',
        name: 'PageUpdate',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './view/PageUpdate.vue')
      },

    ]
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/news',
    name: 'PageNews',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageNews.vue')
  },
  {
    path: '/rank',
    name: 'PageRank',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './view/PageRank.vue')
  },
  
  // {
  //   path: '/community/:contentId',
  //   name: 'PageView',
  //   props: true,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './view/PageView.vue')

  // }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    return { top: 0 }
  },
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/find', '/change'];
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