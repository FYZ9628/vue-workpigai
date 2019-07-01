<template>
  <div>
    <el-row style="z-index: 1;">
      <CommonHeader style="position: absolute;width: 100%;"></CommonHeader>
    </el-row>
    <el-row style="z-index: 0;">
      <nav-menu></nav-menu>
      <router-view/>
    </el-row>
    <el-row style="z-index: 0;">
      <studentIndex></studentIndex>
    </el-row>
  </div>

</template>

<script>
  import NavMenu from './student/StudentMenu'
  import CommonHeader from './common/CommonHeader'
  export default {
    name: 'StudentHome',
    components: {CommonHeader,NavMenu}
  }
</script>

<style scoped>

</style>
