<template>
    <div>
      <el-container>
        <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >
          <el-input style="width: 300px" v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="primary" style="background-color: #545c64" v-on:click="getUsers">查询</el-button>
        </div>

        </el-header>

        <el-aside width="20px">
        </el-aside>
        <el-main style="padding-top: 10px;padding-left: 50px">
          <el-table
            :data="tableData"
            style="width: 100%"
            height="450">
            <el-table-column
              fixed
              prop="id"
              label="序号"
              width="200" >
            </el-table-column>
            <el-table-column
              fit="true"
              prop="name"
              label="发布教师"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="workTitle"
              label="作业标题"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="endTime"
              label="截止日期"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="state"
              label="提交情况"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="score"
              label="分数"
              width="200">
            </el-table-column>
            <el-table-column  fixed="right" min-width="200" label="操作" >
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="handleWork(scope.$index, scope.row)">作业详情</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleCheck(scope.$index, scope.row)">查看答案</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="7"
            style="padding-top: 20px; padding-right: 50px; text-align:right;"
            :total="50">
          </el-pagination>
        </el-footer>
      </el-container>

  <!--作业详情界面-->
      <el-dialog title="作业详情" :visible.sync="workFormVisible" :append-to-body='true'>
        <el-form :model="workForm" label-width="80px" :rules="workFormRules">

          <el-form-item label="作业内容" >
            <el-input
              type="textarea"
              v-model="workForm.content"
              auto-complete="off"
              :readonly="true"
              :autosize="{ minRows: 8,maxRows:10}"></el-input>
          </el-form-item>
          <el-form-item label="答题区域">
            <el-input
              type="textarea"
               v-model="workForm.detail"
               auto-complete="off"
               :autosize="{ minRows: 8}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="workFormVisible = false">取 消</el-button>
          <el-button type="primary"style="background-color: #545c64" @click.native="workSubmit" :loading="workLoading">提 交</el-button>
        </div>
      </el-dialog>

      <!--查看答案界面-->
      <el-dialog title="作业答案" :visible.sync="checkFormVisible" :append-to-body='true'>
        <el-form :model="checkForm" label-width="80px" :rules="checkFormRules" >

          <el-form-item label="作业内容" >
            <el-input
              type="textarea"
              v-model="checkForm.content2"
              auto-complete="off"
              :readonly="true"
              :autosize="{ minRows: 8,maxRows:10}"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-input
              type="textarea"
              v-model="checkForm.answer"
              auto-complete="off"
              :readonly="true"
              :autosize="{ minRows: 8}"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>



  export default {
    name: 'TeacherIndex',
    components: {
       },
    data() {
      return {
        input: '',
        tableData: [{
          id: '1',
          name: '王小虎',
          workTitle:'操作系统实验1',
          endTime:'2019-7-5 23:59',
          state:'已提交',
          score: '90 ',
        },
          {
            id: '1',
            name: '王小虎',
            workTitle:'操作系统实验1',
            endTime:'2019-7-5 23:59',
            state:'已提交',
            score: '90 ',
          },
          {
            id: '1',
            name: '王小虎',
            workTitle:'操作系统实验2',
            endTime:'2019-7-5 23:59',
            state:'已提交',
            score: '90 ',
          },
          {
            id: '1',
            name: '王小虎',
            workTitle:'安卓实验报告1',
            endTime:'2019-7-5 23:59',
            state:'未提交',
            score: ' ',
          },
          {
            id: '1',
            name: '王小虎',
            workTitle:'安卓实验报告2',
            endTime:'2019-7-5 23:59',
            state:'已提交',
            score: '90 ',
          },],


        workFormVisible: false,//作业详情界面是否显示
        workLoading: false,

        workFormRules: {

        },
        //作业详情界面数据
        workForm: {
          workTitle:'安卓实验报告2',
          endTime:'2019-7-5 23:59',
          content:'作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容',
          detail:'答案内容答案内容答案内容答案内容答案内容答案内容答案内容答案内容',
          score: '90 ',
        },


        checkFormVisible: false,//查看答案界面是否显示
        checkLoading: false,
        checkFormRules: {
        },
        //查看答案界面数据
        checkForm: {
          content:'作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
            '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容',
          answer:'答案内容答案内容答案内容答案内容答案内容答案内容答案内容答案内容',

        },

      }
    },


    methods: {

      //显示作业详情界面
      handleWork: function (index, row) {
        this.workFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      //作业提交按钮逻辑
      workSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },

      //显示查看作业答案界面
      handleCheck: function (index, row) {
        this.checkFormVisible = true;
        this.checkForm = Object.assign({}, row);
      },

    }
  }
</script>

<style scoped>

</style>
