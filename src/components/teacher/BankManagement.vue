<template>
  <div>
    <el-container>
      <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >
          <el-input style="width: 300px" v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="primary" style="background-color: #545c64" v-on:click="getUsers">查询</el-button>
          <el-button type="primary" style="background-color: #545c64" @click="handleAdd">新增</el-button>

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
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    <!--题目详情界面-->
    <el-dialog title="编辑题目" :visible.sync="editFormVisible" :append-to-body='true'>
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="detailForm">
        <el-form-item label="题号" prop="questionId">
          <el-input v-model="editForm.questionId" auto-complete="off"readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="题目标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="题目内容" >
          <el-input
            type="textarea"
            v-model="editForm.detail"
            auto-complete="off"
            :readonly="true"
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
        <el-button @click="detailFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="detailSubmit" :loading="detailLoading">保存</el-button>
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
            v-model="addForm.detail"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="addSubmit" :loading="addLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>



  export default {
    name: 'BankManagement',
    components: {
    },
    data() {
      return {
        input: '',
        tableData: [{
          id: '1',
          questionId:'11223344',
          title: '操作系统例题1',
        },
          {
            id: '2',
            questionId:'11223344',
            title: '信息安全例题1',
          },
          {
            id: '3',
            questionId:'11223344',
            title: '项目管理例题1',
          },
          {
            id: '4',
            questionId:'11223344',
            title: '网络编程例题1',
          },

        ],


        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
        },
        //编辑界面数据
        editForm: {
          questionId: '',
          title: '',
          detail: '',
          answer: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
        },
        //新增界面数据
        addForm: {
          questionId: '',
          title: '',
          detail: '',
          answer: '',
        }
      }
    },


    methods: {


      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        };
      },

      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },

      //获取用户列表,用于显示、搜索
      getUsers() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        //NProgress.start();
        getUserListPage(para).then((res) => {
          this.total = res.data.total;
          this.users = res.data.users;
          this.listLoading = false;
          //NProgress.done();
        });
      },


      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      //编辑
      detailSubmit: function () {
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
      //删除
      handleDelete: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      },
    }
  }
</script>

<style scoped>

</style>
