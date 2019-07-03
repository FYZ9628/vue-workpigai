<template>
  <div>
    <el-container>
      <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >
          <el-input
            @keyup.enter.native="searchClick"
            placeholder="通过标题或ID搜索..."
            prefix-icon="el-icon-search"
            size="medium"
            style="width: 400px;margin-right: 10px"
            v-model="keywords">
          </el-input>
          <el-button size="medium" type="primary" icon="el-icon-search" style="background-color: #545c64"
                     @click="searchClick">搜 索</el-button>

          <!--          <el-input style="width: 300px" v-model="input" placeholder="请输入内容"></el-input>-->
          <!--          <el-button type="primary" style="background-color: #545c64" v-on:click="getUsers">查询</el-button>-->
          <el-button size="medium" type="primary" style="background-color: #545c64" @click="handleAdd">新 增</el-button>

        </div>

      </el-header>

      <el-aside width="20px">
      </el-aside>
      <el-main style="padding-top: 10px;padding-left: 50px">
        <el-table
          :data="banks"
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
            prop="questionId"
            label="题号"
            width="200">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="title"
            label="题目标题"
            width="200">
          </el-table-column>

          <el-table-column  fixed="right" label="操作" >

            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="deleteQuestion(scope.$index, scope.row)">删除</el-button>
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

    <!--题目编辑界面-->
    <el-dialog title="编辑题目" :visible.sync="editFormVisible" :append-to-body='true'>
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="题号" prop="questionId">
          <el-input v-model="editForm.questionId" auto-complete="off"readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="题目标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="题目内容" >
          <el-input
            type="textarea"
            v-model="editForm.content"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input
            type="textarea"
            v-model="editForm.answer"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="editSubmit" :loading="listenLoading">保存</el-button>
      </div>
    </el-dialog>

    <!--新增题目界面-->
    <el-dialog title="新增题目" :visible.sync="addFormVisible" :append-to-body='true'>
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="题号" prop="questionId">
          <el-input v-model="addForm.questionId" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="题目标题" prop="title">
          <el-input v-model="addForm.title" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="题目内容" >
          <el-input
            type="textarea"
            v-model="addForm.content"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input
            type="textarea"
            v-model="addForm.answer"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="addSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>



  export default {
    name: 'BankManagement',

    data() {
      return {
        input: '',
        banks:'',


        editFormVisible: false,//编辑界面是否显示

        editFormRules: {
        },
        //编辑界面数据
        editForm: {
          id:'',
          questionId: '',
          title: '',
          content: '',
          answer: '',
        },

        addFormVisible: false,//新增界面是否显示

        addFormRules: {
        },
        //新增界面数据
        addForm: {
          questionId: '',
          title: '',
          content: '',
          answer: '',
        },

        keywords: '',
        listenLoading: false,
      }
    },

    // mounted，组件挂载后，此方法执行后，页面显示
    mounted: function () {
      this.loadBankInfo();
    },
    methods: {

      //请求加载题库信息
      loadBankInfo () {
        let _this = this
        this.$axios.get('/questionBankInfo').then(resp => {
          if (resp && resp.status === 200) {
            _this.banks = resp.data;
          }
        })
      },
      //查询
      searchClick () {
        let _this = this;
        this.$axios
          .post('/searchQuestionBank', {
            keywords: this.keywords
          }).then(resp => {
          if (resp && resp.status === 200) {
            _this.searchResult = resp.data;
            _this.banks = _this.searchResult;
          }
        })

      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          questionId: '',
          title: '',
          content: '',
          answer: '',
        };
      },

      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;

              // this.user.id = 88; id是自增的，所以当没有的时候就会默认地往后排序号

              this.$axios
                .post('/addQuestionBank', {
                  // id: 12, id是自增的，所以当没有的时候就会默认地往后排序号
                  questionId: this.addForm.questionId,
                  title: this.addForm.title,
                  content: this.addForm.content,
                  answer: this.addForm.answer,
                }).then(resp => {

                if (resp.data == ''){
                  this.$message({
                    message: '添加失败',
                    type: 'failure'
                  });
                  this.listenLoading = false;
                  this.addFormVisible = false;
                }
                if (resp && resp.status === 200) {
                  this.listenLoading = false;
                  this.addFormVisible = false;
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.loadBankInfo();
                  this.$emit('onSubmit')
                }

              })

            });
          }
        });
      },



      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        //this.editForm = Object.assign({}, row);
        this.editForm = {
          id:row.id,
          questionId: row.questionId,
          title: row.title,
          content: row.content,
          answer: row.answer,
        };
      },

      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;


              this.$axios
                .post('/updateQuestionBank', {

                  id:this.editForm.id,//要修改的题目ID
                  questionId: this.editForm.questionId,
                  title: this.editForm.title,
                  content: this.editForm.content,
                  answer: this.editForm.answer,
                }).then(resp => {
                if (resp && resp.status === 200) {
                  if (resp.data == ''){
                    this.$message({
                      message: '修改失败',
                      type: 'failure'
                    });
                    this.listenLoading = false;
                    this.addFormVisible = false;
                  }
                  if (resp && resp.status === 200) {
                    // if (resp.data!=null) {
                    this.listenLoading = false;
                    this.editFormVisible = false;
                    this.loadBankInfo();
                    this.$emit('onSubmit')
                  }

                }
              })


            });
          }
        });
      },
      //删除
      deleteQuestion: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
            this.listenLoading = true;
            this.$axios     //{id: row.id}
              .post('/deleteQuestionBank', {id: row.id}).then(resp => {
              if (resp && resp.data.code === 100) {
                this.listenLoading = false;
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.loadBankInfo()
              }else {
                this.$message({
                  message: '删除失败',
                  type: 'failure'
                });
                this.listenLoading = false;
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>
