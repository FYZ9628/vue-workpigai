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
          :data="teachers"
          style="width: 100%"
          height="445">
          <el-table-column
            fixed
            prop="id"
            label="序号"
            width="150" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="account"
            label="学号"
            width="150">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="sex"
            label="性别"
            width="150">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="className"
            label="班级"
            width="150">
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
          style="padding-top: 20px; padding-right: 50px; text-align:right;"
          :total="50">
        </el-pagination>
      </el-footer>
    </el-container>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body='true'>
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="addForm">
        <el-form-item label="学号" prop="account">
          <el-input v-model="addForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="editSubmit" :loading="editLoading">提 交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body='true'>
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="学号" prop="account">
          <el-input v-model="addForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
    name: 'StudentIndex',
    components: {
    },
    data() {
      return {
        input: '',
        tableData: [{
          id: '1',
          account:'11223344',
          name: '王小虎',
          sex: '男 ',
          className:"16软件"
        },
          {
            id: '2',
            account:'11223344',
            name: '王小虎',
            sex: '男 ',
            className:"16软件"
          },
          {
            id: '2',
            account:'11223344',
            name: '王小虎',
            sex: '男 ',
            className:"16软件"
          },
          {
            id: '2',
            account:'11223344',
            name: '王小虎',
            sex: '男 ',
            className:"16软件"
          },
          {
            id: '2',
            account:'11223344',
            name: '王小虎',
            sex: '男 ',
            className:"16软件"
          },
          {
            id: '2',
            account:'11223344',
            name: '王小虎',
            sex: '男 ',
            className:"16软件"
          },
          {
            id: '2',
            account:'11223344',
            name: '王小虎',
            sex: '男 ',
            className:"16软件"
          },],


        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          account: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          account: '',
          name: '',
          sex: -1,
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          account: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          account: '',
          name: '',
          sex: -1,

        }
      }
    },

    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',

      value: '选项3',
      label: '北京烤鸭'
    }],
    value: '',

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
      editSubmit: function () {
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
