import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import StudentInfo from "@/components/admin/StudentInfo";
import TeacherInfo from "@/components/admin/TeacherInfo";
import AdminHome from "@/components/AdminHome";
import StudentHome from "@/components/StudentHome";
import TeacherHome from "@/components/TeacherHome";
import TeacherWork from "@/components/teacher/TeacherWork";
import WorkPublish from "@/components/teacher/WorkPublish";
import BankManagement from "@/components/teacher/BankManagement";
import WorkDetailList from "@/components/teacher/WorkDetailList";
import WorkDetail from "@/components/student/WorkDetail";
import StudentIndex from "@/components/student/StudentIndex";

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
          component: TeacherInfo,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/studentInfo',
          name: 'StudentIndex',
          component: StudentInfo,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/student',
      name: 'StudentHome',
      component: StudentHome,
      redirect: '/studentIndex',
      children:[
        {
          path: '/studentIndex',
          name: 'StudentIndex',
          component: StudentIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/workDetail',
          name: 'WorkDetail',
          component: WorkDetail,
          meta: {
            requireAuth: true
          }
        }
      ],
    },
    {
      path: '/teacher',
      name: 'TeacherHome',
      component: TeacherHome,
      redirect: '/teacherWork',
      children: [

        {
          path: '/teacherWork',
          name: 'TeacherWork',
          component: TeacherWork,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/workPublish',
          name: 'WorkPublish',
          component: WorkPublish,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/bankManagement',
          name: 'BankManagement',
          component: BankManagement,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/workDetailList',
          name: 'WorkDetailList',
          component: WorkDetailList,
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
