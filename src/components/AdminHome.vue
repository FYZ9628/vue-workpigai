<template>
  <div>
    <el-row style="z-index: 1;">
      <CommonHeader style="position: absolute;width: 100%;"></CommonHeader>
    </el-row>
    <el-row style="z-index: 0;">
      <nav-menu></nav-menu>
      <router-view/>
    </el-row>
  </div>

</template>

<script>
  import NavMenu from './admin/NavMenu'
  import CommonHeader from './common/CommonHeader'

  export default {
    name: 'AdminHome',
    components: {CommonHeader,NavMenu}
  }
</script>

<style scoped>

</style>
