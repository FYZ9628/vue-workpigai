<template>
    <div>
      <el-container>
        <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >

          <el-input
            @keyup.enter.native="searchClick"
            placeholder="通过班级名或课程搜索..."
            prefix-icon="el-icon-search"
            size="medium"
            style="width: 400px;margin-right: 10px"
            v-model="keywords">
          </el-input>
          <el-button size="medium" type="primary" icon="el-icon-search"
                     style="background-color: #545c64"@click="searchClick">搜 索</el-button>

<!--          <el-input style="width: 300px" v-model="input" placeholder="请输入内容"></el-input>-->
<!--          <el-button type="primary" style="background-color: #545c64" v-on:click="getUsers">查询</el-button>-->
          <el-button size="medium" type="primary"  style="background-color: #545c64" @click="handleAdd">新 增</el-button>

        </div>

        </el-header>

        <el-aside width="20px">
        </el-aside>
        <el-main style="padding-top: 10px;padding-left: 50px">
          <el-table
            :data="courses"
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
              prop="mClass.className"
              label="班级"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="teacher.name"
              label="教师"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="courseName"
              label="课程名"
              width="200">
            </el-table-column>
            <el-table-column  fixed="right" label="操作" >

              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click.native="handleEdit(scope.$index, scope.row)" :loading="listenLoading">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click.native="deleteArrange(scope.$index, scope.row)" :loading="listenLoading">删除</el-button>
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

  <!--新增界面-->
      <el-dialog title="新增课程安排" :visible.sync="addFormVisible" :append-to-body='true'>
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="班级" prop="className">
            <el-input v-model="addForm.className" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="教师" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="课程名" prop="className">
            <el-select v-model="value" placeholder="请选择" @change="addFormchickvalue">
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
          <el-button type="primary"style="background-color: #545c64" @click.native="addSubmit" :loading="listenLoading">提 交</el-button>
        </div>
      </el-dialog>

      <!--编辑界面-->
      <el-dialog title="编辑课程安排" :visible.sync="editFormVisible" :append-to-body='true'>
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="班级" prop="className">
            <el-input v-model="addForm.className" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="教师" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程名" prop="courseName">
            <el-input v-model="addForm.courseName" auto-complete="off"></el-input>
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
    name: 'Course',
    components: {
       },
    data() {
      return {
        input: '',
        courses: [], //课程安排信息
        user:{
          id: '',
          account: '',
          password: '',
          type: ''
        },
        mClass:{
          id: '',
          classId: '',
          className: '',
        },
        teacher:{
          id: '',
          user: '',
          name: '',
          type: ''
        },
        keywords: '',
        searchResult: [],
        listenLoading: false,

        editFormVisible: false,//编辑界面是否显示
        editFormRules: {
          className: [
            { required: true, message: '请输入班级名', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入教师名', trigger: 'blur' }
          ],
          courseName: [
            { required: true, message: '请选择课程', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: '',
          className: '',
          name: '',
          courseName: '',
        },

        addFormVisible: false,//新增界面是否显示
        addFormRules: {
          className:  [
            { required: true, message: '请输入班级名', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入教师名', trigger: 'blur' }
          ],
          courseName: [
            { required: true, message: '请选择课程', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          id: '',
          className: '',
          name: '',
          courseName: '',

        },

        // 课程名下拉框数据
        options: [{
          value: '选项1',
          label: '移动软件开发'
        }, {
          value: '选项2',
          label: '操作系统',
        },{
          value: '选项3',
          label: '项目管理'
        }],
        value: ''
      }
    },

    // mounted，组件挂载后，此方法执行后，页面显示
    mounted: function () {
      this.loadCourseInfo();
    },

    methods: {
      //关闭dialog时清数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.loadStudentInfo();
      },
      addFormchickvalue () {
        this.addForm.courseName=this.value
      },

      //请求加载课程安排信息
      loadCourseInfo () {
        let _this = this
        this.$axios.get('/choseCourseInfo').then(resp => {
          if (resp && resp.status === 200) {
            _this.courses = resp.data;
          }
        })
      },

      //查询
      searchClick () {
        let _this = this;
        this.$axios
          .post('/searchChoseCourse', {
            keywords: this.keywords
          }).then(resp => {
          if (resp && resp.status === 200) {


            _this.searchResult = resp.data;

            _this.courses = _this.searchResult;


          }
        })

      },


      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          id: '',
          mClass: '',
          teacher: '',
          courseName:''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;

              // this.user.id = 88; id是自增的，所以当没有的时候就会默认地往后排序号
              this.mClass.id=1;
              this.teacher.id = 1;


              this.$axios
                .post('/addChoseCourse', {
                  // id: 12, id是自增的，所以当没有的时候就会默认地往后排序号
                  mClass:this.mClass,
                  teacher:this.teacher,
                  courseName:'操作系统'
                  // courseName:this.addForm.courseName
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
                  this.loadClassInfo();
                  this.$emit('onSubmit')
                }
              })


            });
          }
        });
      },

      //显示编辑界面
      handleEdit: function (index,row) {
        this.editFormVisible = true;
        //this.editForm = Object.assign({}, row);
        this.editForm = {
          id: row.id,
          account: '',
          name: '',
          sex: '男',
        };
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;

              this.user.id = 45;  //要修改的用户编号
              this.user.account = "T116263000288";
              this.user.password = "123456";
              this.user.type = 2;

              this.$axios
                .post('/addTeacher', {
                  id: 14, //要修改的教师工号
                  user: this.user,
                  name: "编辑测试",
                  sex: "男",
                }).then(resp => {
                if (resp && resp.status === 200) {
                  this.editFormVisible = false;
                  this.listenLoading = false;
                  this.$emit('onSubmit')
                }
              })


            });
          }
        });
      },

      //删除课程安排
      deleteArrange: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
            this.listenLoading = true;
            this.$axios     //{id: row.id}
              .post('/deleteChoseCourse', {id: row.id}).then(resp => {
              if (resp && resp.data.code === 100) {
                this.listenLoading = false;
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.loadCourseInfo()
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
