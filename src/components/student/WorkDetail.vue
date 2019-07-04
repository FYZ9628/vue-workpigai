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
            v-model="workData.workDetail.publishContent"
            resize="none"
          ></el-input>
        </div></el-col>
        <el-col :span="11"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">答题区域</span>
          <el-input
            :autosize="{ minRows: 20}"
            type="textarea"
            v-model="submitContent"
            resize="none"
          ></el-input>
        </div></el-col>

      </el-row>
    </el-main>
  <el-footer>
    <el-footer style="padding-right: 100px;text-align:right;">
      <el-button type="primary" style="background-color: #545c64;" v-on:click="workSubmit">提 交</el-button>
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
          questionTextarea:'',
          submitContent:'',
          // 详情界面接收作业列表传过来的数据
          workData:this.$route.query.data,
          workId:this.$route.query.data.id,
          listenLoading: false,
        }
      },
      // mounted，组件挂载后，此方法执行后，页面显示
      mounted: function () {
        this.judgeState();
      },
      methods: {
        goBack() {
          window.history.back()
          console.log('go back');
        },

        judgeState(){
          if (this.$route.query.data.state=="已提交"){
            this.submitContent=this.$route.query.data.submitContent
          }
        },
        //提交作业
        workSubmit: function () {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.listenLoading = true;
                this.$axios
                  .post('/submitAnswer', {
                    workId:this.workId,
                    submitContent:this.submitContent,
                  }).then(resp => {
                  if (resp.data == ''){
                    this.$message({
                      message: '提交失败',
                      type: 'failure'
                    });
                    this.listenLoading = false;

                  }
                  if (resp.data!=null) {
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                    this.listenLoading = false;
                    //this.loadWorkInfo();
                    this.$emit('onSubmit')
                  }

                })
              });
        },
      }
    }

</script>

<style scoped>
  span {
    pointer-events: none;
  }
</style>
