<template>
  <el-container>
    <el-main style="padding-top: 30px;padding-left: 50px">
      <el-row :gutter="30">

        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">题库选择题目</span>
          <el-table
            ref="multipleTable"
            :data="questionBanks"
            style="width: 100%"
            height="450"
            @selection-change="handleSelectionChange">
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
            v-model="questionTextarea"
            resize="none"
          ></el-input>
        </div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple">
          <span style="font-size: 20px;font-weight: bold">手动添加题目的答案</span>
          <el-input
            :autosize="{ minRows: 20}"
            type="textarea"
            v-model="answerTextarea"
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
                  <el-select v-model="classOptionsValue" placeholder="选择发布班级" @change="classOptionValueChange">
                    <el-option
                      v-for="item in classOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <el-date-picker
                    v-model="endTimePicker"
                    type="datetime"
                    placeholder="选择截止时间">
                  </el-date-picker>
                  <el-button type="primary" style="background-color: #545c64;" @click.native="handlePublish" :loading="listenLoading">发 布</el-button>

      </div>


    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "WorkPublish",
      data() {
        return {
          account:localStorage.getItem("account"),
          workTitle: '',
          questionTextarea: '',//题目文本
          answerTextarea: '',//答案文本

          endTimePicker:'',//截止时间
          questionBanks: [],//题库表格数据
          classes:[],
          classOptions: [],
          classOptionsValue: '', //选中选择之后的值
          multipleSelection: [], //题库多选

          listenLoading: false,

          worksDetail :{
            id: '',
            workTitle: '',
            publishContent: '',
            answer: ''
          },

          Work: {
            id: '',
            workDetail:'',
            teacherId: '',
            classId: '',
            endTime: ''
          },


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
              _this.questionBanks = resp.data;
            }
          });


          //请求加载班级信息
          this.$axios.get('/classInfo').then(resp => {
            if (resp && resp.status === 200) {
              _this.classes = resp.data;

              let tempClasses = [];
              for (let i = 0; i < _this.classes.length; ++i) {
                let tempClassOption= {
                  value: '',
                  label: ''
                };
                let ii = i +1;
                // tempCourseOption.value = "选项"+ii;
                tempClassOption.value = _this.classes[i].id;
                tempClassOption.label = _this.classes[i].className;
                tempClasses.push(tempClassOption)
              }
              this.classOptions = tempClasses;

            }
          });


        },


        handleSelectionChange(value) {
          this.multipleSelection = value;
        },

        classOptionValueChange (value){
          this.classOptionsValue=value;
        },

        handleWork: function() {
          let x = 0;
          for (let i = 0; i < this.questionBanks.length; i++) {
            for (let j = 0; j <this.multipleSelection.length; j++) {
              if (this.questionBanks[i].id == this.multipleSelection[j].id){
                x += 1;
                this.worksDetail.publishContent += x + " 、 " +this.questionBanks[i].content +"\n\n";
                this.worksDetail.answer += x + " 、 " +this.questionBanks[i].answer +"\n\n";

              }
            }

          }

          // this.worksDetail.workTitle = this.workTitle;

          console.log("测试测试");
          console.log("测试测试");
          console.log("测试测试\n"+this.worksDetail.publishContent);
          console.log("测试测试\n"+this.worksDetail.answer);

        },


        //处理发布作业
        handlePublish: function () {

          this.handleWork();

          // let tempWork = {
          //   id: '',
          //   worksDetailId: '',
          //   worksDetailWorkTitle: this.workTitle,
          //   worksDetailPublishContent: this.worksDetail.publishContent,
          //   worksDetailAnswer: this.worksDetail.answer,
          //   teacherId: 7,
          //   classId: this.classOptionsValue,
          //   endTime: this.endTimePicker
          // };
          //
          // console.log("发布测试");
          // console.log(tempWork.id);
          // console.log(tempWork.worksDetailId);
          // console.log(tempWork.worksDetailWorkTitle);
          // console.log(tempWork.worksDetailPublishContent);
          // console.log(tempWork.worksDetailAnswer);
          // console.log(tempWork.teacherId);
          // console.log(tempWork.classId);
          // console.log(tempWork.endTime);


          this.$confirm('确认发布?', '提示', {
            type: 'warning'
          }).then(() => {
              this.listenLoading = true;
              this.$axios
                .post('/publishWork', {
                  id: 99,
                  worksDetailId: 99,
                  worksDetailWorkTitle: this.workTitle,
                  worksDetailPublishContent: this.worksDetail.publishContent,
                  worksDetailAnswer: this.worksDetail.answer,
                  teacherId: 7,
                  classId: this.classOptionsValue,
                  endTime: this.endTimePicker
                  }).then(resp => {
                if (resp && resp.data.code === 100) {
                  this.listenLoading = false;
                  this.$message({
                    message: '发布成功',
                    type: 'success'
                  });
                  this.loadBankInfo();
                }else {
                  this.$message({
                    message: '该班级没有学生，发布失败',
                    type: 'failure'
                  });
                  this.listenLoading = false;
                }
              })
            }
          ).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发布'
            })
          })

        },

      }
    }
</script>

<style scoped>

</style>
