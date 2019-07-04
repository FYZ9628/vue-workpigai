<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="作业详情列表" style="margin-top: 10px">
      </el-page-header>
    </el-header>

    <el-main style="margin-left: auto; margin-right: auto;">
        <el-table
          :data="works"
          style="width: 1400px"
          height="450">
          <el-table-column
            fixed
            prop="student.id"
            label="序号"
            width="200" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="student.user.account"
            label="学号"
            width="200" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="student.name"
            label="学生姓名"
            width="200" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="score"
            label="分数"
            width="200" >
          </el-table-column>
          <el-table-column  fixed="right" label="操作" min-width="200" >

            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleCorrect(scope.$index, scope.row)">批改</el-button>
            </template>
          </el-table-column>
        </el-table>


    </el-main>
    <!--作业批改界面-->
    <el-dialog title="作业详情" :visible.sync="correctFormVisible" :append-to-body='true'>
      <el-form :model="correctForm" label-width="80px" :rules="correctFormRules" ref="detailForm">
        <el-form-item label="作业内容" >
          <el-input
            type="textarea"
            v-model="correctForm.content"
            auto-complete="off"
            :readonly="true"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="学生答案">
          <el-input
            type="textarea"
            v-model="correctForm.submit_content"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="correctForm.score" auto-complete="off"readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="correctFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="detailSubmit" :loading="correctLoading">保存</el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>
    export default {
        name: "WorkDetailList",
      data() {
        return {
          account:localStorage.getItem("account"),
          // 详情界面接收作业列表传过来的数据
          workDetailId:this.$route.query.data.workDetail.id,
          works: [],  //个人账号里面发布的所有作业
          input: '',
          correctFormVisible: false,//新增界面是否显示
          correctLoading: false,
          correctFormRules: {
          },
          //新增界面数据
          correctForm: {
            content:'',
            submit_content: '',
            score: '',
          }
        }
      },
      // mounted，组件挂载后，此方法执行后，页面显示
      mounted: function () {
        this.loadWorkInfo();

      },
      methods: {

        //请求加载学生作业信息
        loadWorkInfo () {
          let _this = this
          this.$axios
            .post('/getTeacherPersonalWork', {
              keywords: this.account
            }).then(resp => {
            if (resp && resp.status === 200) {
              _this.works = resp.data;

              let tempWorkList = [];
              for (let i = 0; i < _this.works.length; i++) {
                if (_this.workDetailId == _this.works[i].workDetail.id){
                  tempWorkList.push(_this.works[i])
                  }
              }
              _this.works = tempWorkList;
            }
          })

        },


        goBack() {
          window.history.back()
          console.log('go back');
        },
        //显示批改界面
        handleCorrect: function (index, row) {
          this.correctFormVisible = true;
          //this.correctForm = Object.assign({}, row);
          this.correctForm = {
            content:row.workDetail.publishContent,
            submit_content:row.submitContent,
            score:row.score,
          };
        },
      }
    }

</script>

<style scoped>

</style>
