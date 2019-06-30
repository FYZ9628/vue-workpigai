<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">管理员登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.account"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

  export default {
    name: 'AdminLogin',
    data () {
      return {
        loginForm: {
          account: '1001',
          password: '123456'
        },
        responseResult: []
      }
    },
    methods: {
      login () {
        var _this = this
        console.log(this.$store.state)
        this.$axios
          .post('/admin_login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 100) {
              // var data = this.loginForm
              _this.$store.commit('admin_login', _this.loginForm)
              var path = this.$route.query.redirect
              this.$router.replace({path: path === '/' || path === undefined ? '/admin' : path})
            }
          })
          .catch(failResponse => {
          })
      }
    }
  }
</script>

<style>
  #poster {
    background: url("../assets/login_background.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 20px;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
