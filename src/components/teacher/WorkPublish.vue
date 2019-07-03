<template>
  <el-container>
    <el-main style="padding-top: 30px;padding-left: 50px">
      <el-row :gutter="30">

        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">题库选择题目</span>
          <el-table
            :data="banks"
            style="width: 100%"
            height="450">
            <el-table-column
              fixed
              prop="questionId"
              label="题号"
              width="100" >
            </el-table-column>
            <el-table-column
              fit="true"
              prop="title"
              label="题目标题"
              width="150">
            </el-table-column>
            <el-table-column type="selection" width="55">
            </el-table-column>
          </el-table>
        </div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">手动添加题目</span>
          <el-input
            :autosize="{ minRows: 20,maxRows:20}"
            type="textarea"
            v-model="question_textarea"
            resize="none"
          ></el-input>
        </div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">手动添加题目的答案</span>
          <el-input
            :autosize="{ minRows: 20}"
            type="textarea"
            v-model="anwser_textarea"
            resize="none"
          ></el-input>
        </div></el-col>

      </el-row>

    </el-main>
    <el-footer style="padding-right: 100px;text-align:right;">


<!--        <div class="block">-->
<!--          <el-input v-model="input" placeholder="请输入作业标题"></el-input>-->
<!--          <el-select v-model="value" placeholder="选择发布班级">-->
<!--            <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          -->
<!--          <el-date-picker-->
<!--            v-model="endTime_picker"-->
<!--            type="datetime"-->
<!--            placeholder="选择截止时间">-->
<!--          </el-date-picker>-->
<!--          <el-button type="primary" style="background-color: #545c64;" v-on:click="handlePublish">发 布</el-button>-->
<!--        </div>-->
      <div >

        <el-input
          @keyup.enter.native="searchClick"
          placeholder="请输入作业标题..."

          size="primary"
          style="width: 300px;margin-right: 10px"
          v-model="workTitle">
        </el-input>
                  <el-select v-model="value" placeholder="选择发布班级">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <el-date-picker
                    v-model="endTime_picker"
                    type="datetime"
                    placeholder="选择截止时间">
                  </el-date-picker>
                  <el-button type="primary" style="background-color: #545c64;" v-on:click="handlePublish">发 布</el-button>

      </div>


    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "WorkPublish",
      data() {
        return {
          workTitle: '',
          question_textarea: '',//题目文本
          anwser_textarea: '',//答案文本

          endTime_picker:'',//截止时间
          banks:'',//题库表格数据

          options: [{
            value: '选项1',
            label: '16软件'
          }, {
            value: '选项2',
            label: '17软件'
          }, {
            value: '选项3',
            label: '18软件'
          }, {
            value: '选项4',
            label: '16网络'
          }, {
            value: '选项5',
            label: '16信管'
          }],
          value: ''
        }

      },
      mounted: function () {
        this.loadBankInfo();
      },
      methods:{
        //请求加载题库信息
        loadBankInfo () {
          let _this = this
          this.$axios.get('/questionBankInfo').then(resp => {
            if (resp && resp.status === 200) {
              _this.banks = resp.data;
            }
          })
        },
        //处理发布作业
        handlePublish: function () {
        }
      }
    }
</script>

<style scoped>

</style>
