<template>
  <el-card class="common-header">
    <a href="/index">
      <img src="../../assets/icon2.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">作业批改系统</span>

    <div style="float: right;padding-right: 10px">
      <el-dropdown  >
        <span class="el-dropdown-link" style="margin-right: 20px">
        管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
<!--          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
        </el-dropdown-menu>
        <span style="float: right;padding-right: 10px">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="80"></el-avatar>
      </span>
      </el-dropdown>

    </div>

  </el-card>
</template>

<script>
  export default {
    name: 'commonHeader',
    methods:{
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    }
  }
</script>

<style scoped>
  .common-header {

    height: 80px;
    opacity: 0.85;
    line-height: 40px;
  }
  .el-dropdown-link {
       cursor: pointer;
       color: #409EFF;
       text-size:20px;
     }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
