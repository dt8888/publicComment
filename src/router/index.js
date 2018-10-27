import Vue from 'vue'
import Router from 'vue-router'
import publicComment from '../pages/publicComment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'publicComment',
      component: publicComment
    }
  ]
})
