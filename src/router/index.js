import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import StudentIndex from "@/components/admin/StudentIndex";
import TeacherIndex from "@/components/admin/TeacherIndex";
import AdminHome from "@/components/AdminHome";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin_login',
      name: 'AdminLogin',
      component: AdminLogin
    },

    {
      path: '/admin',
      name: 'AdminHome',
      component: AdminHome,
      redirect: '/teacherInfo',
      children: [

        {
          path: '/teacherInfo',
          name: 'TeacherIndex',
          component: TeacherIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/studentInfo',
          name: 'StudentIndex',
          component: StudentIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },

    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    }
  ]
})
