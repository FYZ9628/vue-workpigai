<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="作业详情" style="margin-top: 10px">
      </el-page-header>
    </el-header>

    <el-main style="padding-top: 10px;padding-left: 50px">

      <el-row :gutter="30">

        <el-col :span="11"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">作业内容</span>
          <el-input
            :autosize="{ minRows: 20,maxRows:20}"
            type="textarea"
            readonly="true"
            prefix="题目题目题目"
            v-model="question_textarea"
            resize="none"
          ></el-input>
        </div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">答题区域</span>
          <el-input
            :autosize="{ minRows: 20}"
            type="textarea"
            v-model="submit_content"
            resize="none"
          ></el-input>
        </div></el-col>

      </el-row>
    </el-main>
  <el-footer>
    <el-footer style="padding-right: 100px;text-align:right;">
      <el-button type="primary" style="background-color: #545c64;" v-on:click="getUsers">提 交</el-button>
    </el-footer>
  </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "WorkDetail",
      data() {
        return {
          input: '',
          question_textarea:'',
          submit_content:'',
        }
      },

      methods: {
        goBack() {
          window.history.back()
          console.log('go back');
        }
      }
    }

</script>

<style scoped>
  span {
    pointer-events: none;
  }
</style>
