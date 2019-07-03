<template>
  <div>
    <el-container>
      <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >

          <el-input
            @keyup.enter.native="searchClick"
            placeholder="通过姓名或ID搜索..."
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
          :data="students"
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
            prop="user.account"
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
            prop="mClass.className"
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
                @click="deleteStudent(scope.$index, scope.row)">删除</el-button>
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


    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body='true'
               @close="resetForm('addForm')" >
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="学号" prop="account">
          <el-input v-model="addForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="radios" @change="addFormChangeSex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-select v-model="addForm.classOptionsValue" placeholder="请选择" @change="addFormClassOptionValue">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="addSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>


    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body='true'
               @close="resetForm('editForm')">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="学号" prop="account">
          <el-input v-model="editForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="radios" @change="editFormChangeSex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-select v-model="editForm.classOptionsValue" placeholder="请选择" @change="editFormClassOptionValue">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="editSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>


  export default {
    name: 'StudentInfo',
    components: {
    },
    data() {
      return {
        input: '',
        students: [],//学生信息
        classes:[], //班级信息
        user:{
          id: '',
          account: '',
          password: '',
          type: ''
        },
        mClass:{
          id: '',
          classId: '',
          className: ''
        },
        keywords: '',
        searchResult: [],
        listenLoading: false,



        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          account: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          account: '',
          password:'',
          name: '',
          sex: -1,
          classOptionsValue: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          account: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          account: '',
          password:'',
          name: '',
          sex: -1,
          classOptionsValue: '',

        },
        // 班级名下拉框数据
        classOptions: [],

        returnData: {
          classId: '',
        },

        radios: 1 //默认性别为 男

      }
    },



    // mounted，组件挂载后，此方法执行后，页面显示
    mounted: function () {
      this.loadStudentInfo();
      // this.editSubmit();
    },

    methods: {
      //关闭dialog时清数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.loadStudentInfo();
      },
      //新增界面班级下拉框
      addFormClassOptionValue (value){
        this.addForm.classOptionsValue=value;
        this.returnData.classId = value;
      },
      //编辑界面班级下拉框
      editFormClassOptionValue (value){
        this.editForm.classOptionsValue=value;
        this.returnData.classId = value;
      },


      //请求加载学生信息
      loadStudentInfo () {
        let _this = this
        this.$axios.get('/studentInfo').then(resp => {
          if (resp && resp.status === 200) {
            _this.students = resp.data;
          }
        })
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

      //查询
      searchClick () {
        let _this = this;
        this.$axios
          .post('/searchStudent', {
            keywords: this.keywords
          }).then(resp => {
          if (resp && resp.status === 200) {
            _this.searchResult = resp.data;
            _this.students = _this.searchResult;

          }
        })

      },


      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          account: '',
          password:'',
          name: '',
          sex: '男',
          className: ''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;

              // this.user.id = 88; id是自增的，所以当没有的时候就会默认地往后排序号
              this.user.account = this.addForm.account;
              this.user.password = this.addForm.password;
              this.user.type = 1;


              this.mClass.id=this.returnData.classId;
              // this.mClass.classId='20160001';
              // this.mClass.className='16软件';
              this.$axios
                .post('/addStudent', {
                  // id: 12, id是自增的，所以当没有的时候就会默认地往后排序号
                  user: this.user,
                  name: this.addForm.name,
                  sex: this.addForm.sex,
                  mClass:this.mClass,
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
                    message: '删除成功',
                    type: 'success'
                  });
                  this.loadStudentInfo();
                  this.$emit('onSubmit')
                }

              })

            });
          }
        });
      },


      //添加用户性别选择单选按钮
      addFormChangeSex(value) {
        if (value == 1){
          this.addForm.sex = '男'
        }
        if (value == 0) {
          this.addForm.sex = '女'
        }
      },
      //编辑用户性别选择单选按钮
      editFormChangeSex(value) {
        if (value == 1){
          this.editForm.sex = '男'
        }
        if (value == 0) {
          this.editForm.sex = '女'
        }
      },
      //显示编辑界面
      handleEdit: function (index,row) {
        this.editFormVisible = true;
        // this.editForm = Object.assign({}, row);
        // this.editForm.user=row.user;
        this.editForm = {
          id: row.id,
          userId:row.user.id,
          account: row.user.account,
          password:row.user.password,
          name: row.name,
          sex: row.sex,
        };
        if (this.editForm.sex == '男') {
          this.radios =1;
        }
        if (this.editForm.sex == '女') {
          this.radios =0;
        }
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;

              // this.user.id = 88; id是自增的，所以当没有的时候就会默认地往后排序号
              this.user.id =this.editForm.userId;
              this.user.account = this.editForm.account;
              this.user.password = this.editForm.password;
              this.user.type = 1;


              this.mClass.id=this.returnData.classId;
              this.$axios
                .post('/updateStudent', {

                  id:this.editForm.id,
                  user: this.user,
                  name: this.editForm.name,
                  sex: this.editForm.sex,
                  mClass:this.mClass,
                }).then(resp => {

                if (resp.data == ''){
                  this.$message({
                    message: '编辑失败',
                    type: 'failure'
                  });
                  this.listenLoading = false;
                  this.editFormVisible = false;
                }
                if (resp && resp.status === 200) {
                  this.listenLoading = false;
                  this.editFormVisible = false;
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
                  this.loadStudentInfo();
                  this.$emit('onSubmit')
                }

              })

            });
          }
        });
      },


      //删除
      deleteStudent: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
            this.listenLoading = true;
            this.$axios     //{id: row.id}
              .post('/deleteStudent', {id: row.id}).then(resp => {
              if (resp && resp.data.code === 100) {
                this.listenLoading = false;
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.loadStudentInfo()
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
      }



    }
  }
</script>

<style scoped>

</style>
