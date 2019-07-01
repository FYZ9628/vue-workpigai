<template>
  <div>
    <el-row style="z-index: 1;">
      <CommonHeader style="position: absolute;width: 100%;"></CommonHeader>
    </el-row>
    <el-row style="z-index: 0;">
      <TeacherMenu></TeacherMenu>
      <router-view/>
    </el-row>
  </div>

</template>

<script>
  import TeacherMenu from './teacher/TeacherMenu'
  import CommonHeader from './common/CommonHeader'

  export default {
    name: 'TeacherHome',
    components: {CommonHeader,TeacherMenu}
  }
</script>

<style scoped>

</style>
