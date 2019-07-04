<template>
  <el-card class="common-header">
    <a >
      <img src="../../assets/icon2.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">作业批改系统</span>



    <el-dropdown  show-timeout="10" hide-timeout="50" style="float: right;padding-right: 10px">
      <div class="el-dropdown-link" >
        <span >
          你好，管理员
        </span>
        <span style="float: right;margin-left: 10px">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="80"></el-avatar>
        </span>

        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item divided="true" @click.native="logOut">退出登录</el-dropdown-item>
          <!--          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
        </el-dropdown-menu>

        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </el-dropdown>



  </el-card>
</template>

<script>
  export default {
    name: 'passwordModifyHeader',
    data(){
      username:''
    },
    methods:{
      passwordModify:function(){
        this.$router.push({
          path: '/passwordModify',
        })
      },
      //退出登录
      logOut: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          _this.$store.commit("logout");
          //_this.$router.push('/login');
          this.$router.push({
            path: '/login',
          })
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
