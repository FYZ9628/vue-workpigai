<template>

  <body >
  <el-row style="z-index: 1;">
    <CommonHeader style="position: absolute;width: 100%;"></CommonHeader>
  </el-row>
  <el-form :model="passwordModifyForm" :rules="rules2" ref="loginForm" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">修改密码</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="passwordModifyForm.account"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="passwordModifyForm.password"
                auto-complete="off" placeholder="密码" v-on:keyup.enter.native="login"></el-input>
    </el-form-item>
    <el-form-item prop="passwordAgain">
      <el-input type="password" v-model="passwordModifyForm.passwordAgain"
                auto-complete="off" placeholder="密码" v-on:keyup.enter.native="login"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;
      border: none" @click.native.prevent="login" :loading="modifying">确 认 修 改</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
  import CommonHeader from './CommonHeader'

  export default {
    name: 'PasswordModify',
    components: {CommonHeader},
    data () {
      return {
        modifying: false,
        passwordModifyForm: {
          account: '116263000101',
          password: '123456',
          passwordAgain:'123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          passwordAgain: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
          ]
        },
        checked: false,
        responseResult: [],
      }
    },
    methods: {

    }
  }
</script>

<style>

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

  .remember {
    margin: 0px 0px 35px 0px;
  }

</style>
