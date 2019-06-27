import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import AdminIndex from "@/components/admin/AdminIndex";
import TeacherInfo from "@/components/admin/TeacherInfo";
import StudentInfo from "@/components/admin/StudentInfo";
import ClassInfo from "@/components/admin/ClassInfo";
import Course from "@/components/admin/Course";

Vue.use(Router)

export default new Router({
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
      component: AdminIndex,
      name: 'AdminIndex',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/main', component: TeacherInfo, name: '教师信息', hidden: true },
        { path: '/table', component: StudentInfo, name: '学生信息' },
        { path: '/form', component: ClassInfo, name: '班级信息' },
        { path: '/user', component: Course, name: '课程安排' },
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
