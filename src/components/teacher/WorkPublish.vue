<template>
  <el-container>
    <el-main style="padding-top: 30px;padding-left: 50px">
      <el-row :gutter="30">

        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">题库选择题目</span>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="450">
            <el-table-column
              fixed
              prop="id"
              label="序号"
              width="100" >
            </el-table-column>
            <el-table-column
              fit="true"
              prop="workTitle"
              label="作业标题"
              width="150">
            </el-table-column>
            <el-table-column type="selection" width="55">
            </el-table-column>
          </el-table>
        </div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">手动添加的题目</span>
          <el-input
            :autosize="{ minRows: 20,maxRows:20}"
            type="textarea"
            prefix="题目题目题目"
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


        <div class="block">
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
          question_textarea: '',
          anwser_textarea: '',
          startTime_picker:'',
          endTime_picker:'',
          tableData: [{
            id: '1',
            workTitle:'Linux题目',
          },
            {
              id: '2',
              workTitle:'网络编程作业1',
            },
            {
              id: '3',
              workTitle:'安卓作业1',
            },
            {
              id: '4',
              workTitle:'操作系统题目1',
            },
          ],
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
      methods:{

        //处理发布作业
        handlePublish: function () {
        }
      }
    }
</script>

<style scoped>

</style>
