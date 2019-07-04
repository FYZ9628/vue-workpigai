<template>
  <div>
    <el-row style="z-index: 1;">
      <CommonHeader style="position: absolute;width: 100%;"></CommonHeader>
    </el-row>
    <el-row style="z-index: 0;">
      <AdminMenu></AdminMenu>
      <router-view/>
    </el-row>
  </div>

</template>

<script>
  import AdminMenu from './admin/AdminMenu'
  import CommonHeader from './common/CommonHeader'

  export default {
    name: 'AdminHome',
    components: {CommonHeader,AdminMenu}
  }
</script>

<style scoped>

</style>
