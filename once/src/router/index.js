import Vue from 'vue';
import VueRouter from 'vue-router';
// import Index from '../components/Index'

const Index = () =>
  import('../components/Index');
const Detail = () =>
  import('../components/Detail');
const Color = () =>
  import('../components/Color');
const Img = () =>
  import('../components/Img');
const Type = () =>
  import('../components/Type')
const Quotation = () =>
  import('../components/Quotation')
const Login = () =>
  import('../components/Login')

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'hash',
  routes: [{
    path: '/index',
    name: 'Index',
    component: Index
  }, {
    path: '/detail',
    component: Detail
  }, {
    path: '/color',
    component: Color
  }, {
    path: '/img',
    component: Img
  }, {
    path: '/type',
    component: Type
  }, {
    path: '/quotation',
    component: Quotation
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    redirect: '/index'
  }]
})

//全局导航守卫
router.beforeEach((to, from, next) => {
  console.log(from, to)
  let login = window.localStorage.getItem('login');
  console.log(login)
  if (!login && to.path != '/login') {
    next('/login')
  }
  next()
})

router.afterEach((to, from) => {
  console.log('路由跳转')
})
export default router
