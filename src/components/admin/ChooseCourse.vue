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
            :data="chooseCourses"
            style="width: 100%"
            height="400">
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
<!--          <el-form-item label="班级" prop="className">-->
<!--            <el-input v-model="addForm.className" auto-complete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="教师" prop="name">-->
<!--            <el-input v-model="addForm.name" auto-complete="off"></el-input>-->
<!--          </el-form-item>-->


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

          <el-form-item label="教师" prop="teacherName">
            <el-select v-model="addForm.teacherOptionsValue" placeholder="请选择" @change="addFormTeacherOptionValue">
              <el-option
                v-for="item in teacherOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="课程名" prop="CourseName">
            <el-select v-model="addForm.courseOptionsValue" placeholder="请选择" @change="addFormCourseOptionValue">
              <el-option
                v-for="item in courseOptions"
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
            <el-select v-model="editForm.classOptionsValue" placeholder="请选择" @change="editFormClassOptionValue">
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="教师" prop="teacherName">
            <el-select v-model="editForm.teacherOptionsValue" placeholder="请选择" @change="editFormTeacherOptionValue">
              <el-option
                v-for="item in teacherOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="课程名" prop="CourseName">
            <el-select v-model="editForm.courseOptionsValue" placeholder="请选择" @change="editFormCourseOptionValue">
              <el-option
                v-for="item in courseOptions"
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
    name: 'Course',
    components: {
       },
    data() {
      return {
        input: '',
        chooseCourses: [], //课程安排信息
        courseList: [], //课程列表信息
        classes:[], //班级信息
        teachers: [], //教师信息
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
          // className: [
          //   { required: true, message: '请输入班级名', trigger: 'blur' }
          // ],
          // teacherName: [
          //   { required: true, message: '请输入教师名', trigger: 'blur' }
          // ],
          // courseName: [
          //   { required: true, message: '请选择课程', trigger: 'blur' }
          // ]
        },
        //编辑界面数据
        editForm: {
          id: '',
          className: '',
          name: '',
          courseName: '',
          //三个下拉框的默认选项
          courseOptionsValue: '',
          classOptionsValue: '',
          teacherOptionsValue: ''
        },

        addFormVisible: false,//新增界面是否显示
        addFormRules: {
          // className:  [
          //   { required: true, message: '请输入班级名', trigger: 'blur' }
          // ],
          // teacherName: [
          //   { required: true, message: '请输入教师名', trigger: 'blur' }
          // ],
          // courseName: [
          //   { required: true, message: '请选择课程', trigger: 'blur' }
          // ]
        },
        //新增界面数据
        addForm: {
          id: '',
          className: '',
          name: '',
          courseName: '',

          //三个下拉框的默认选项
          courseOptionsValue: '',
          classOptionsValue: '',
          teacherOptionsValue: ''


        },

        // 课程名下拉框数据
        courseOptions: [],
        // 班级名下拉框数据
        classOptions: [],
        // 教师名下拉框数据
        teacherOptions:[],

        returnData: {
         // chooseCourseId:'',
          courseId: '',
          classId: '',
          teacherId: ''
        }


        //三个下拉框的默认选项
        // courseOptionsValue: '',
        // classOptionsValue: '',
        // teacherOptionsValue: ''
      }
    },

    // mounted，组件挂载后，此方法执行后，页面显示
    mounted: function () {
      this.loadChooseCourseInfo();
    },

    methods: {
      //关闭dialog时清数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.loadChooseCourseInfo();
      },


      addFormCourseOptionValue (value) {
        this.addForm.courseOptionsValue=value;
        this.returnData.courseId = value;
      },
      addFormTeacherOptionValue (value) {
        this.addForm.teacherOptionsValue=value;
        this.returnData.teacherId = value;
      },
      addFormClassOptionValue (value){
        this.addForm.classOptionsValue=value;
        this.returnData.classId = value;
      },

      editFormCourseOptionValue (value) {
        this.addForm.courseOptionsValue=value;
        this.returnData.courseId = value;
      },
      editFormTeacherOptionValue (value) {
        this.addForm.teacherOptionsValue=value;
        this.returnData.teacherId = value;
      },
      editFormClassOptionValue (value){
        this.addForm.classOptionsValue=value;
        this.returnData.classId = value;
      },
      //请求加载课程、班级、教师信息
      loadChooseCourseInfo () {
        let _this = this;
        //请求加载选课安排信息
        this.$axios.get('/choseCourseInfo').then(resp => {
          if (resp && resp.status === 200) {
            _this.chooseCourses = resp.data;

          }
        });

        //请求加载课程信息
        this.$axios.get('/courseList').then(resp => {
          if (resp && resp.status === 200) {
            _this.courseList = resp.data;


            let tempCourse = [];
            for (let i = 0; i < _this.courseList.length; ++i) {
              let tempCourseOption= {
                value: '',
                label: ''
              };
              let ii = i +1;
              // tempCourseOption.value = "选项"+ii;
              tempCourseOption.value = _this.courseList[i].id;
              tempCourseOption.label = _this.courseList[i].name;
              tempCourse.push(tempCourseOption)
            }
            this.courseOptions = tempCourse;

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

        //请求加载教师信息
        this.$axios.get('/teacherInfo').then(resp => {
          if (resp && resp.status === 200) {
            _this.teachers = resp.data;

            let tempTeachers = [];
            for (let i = 0; i < _this.teachers.length; ++i) {
              let tempTeacherOption= {
                value: '',
                label: ''
              };
              let ii = i +1;
              // tempCourseOption.value = "选项"+ii;
              tempTeacherOption.value = _this.teachers[i].id;
              tempTeacherOption.label = _this.teachers[i].name;
              tempTeachers.push(tempTeacherOption)
            }
            this.teacherOptions = tempTeachers;

          }
        });

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
            _this.chooseCourses = _this.searchResult;

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
              this.$axios
                .post('/addChoseCourse', {
                  chooseCourseId:'',
                  courseId: this.returnData.courseId,
                  teacherId: this.returnData.teacherId,
                  classId: this.returnData.classId

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
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.listenLoading = false;
                  this.addFormVisible = false;
                  this.loadChooseCourseInfo();
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

          // //三个下拉框的默认选项
          // courseOptionsValue: row.id.className,
          // classOptionsValue: '',
          // teacherOptionsValue: ''

        };
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;
              this.$axios
                .post('/updateChoseCourse', {
                  chooseCourseId:this.editForm.id,
                  courseId: this.returnData.courseId,
                  teacherId: this.returnData.teacherId,
                  classId: this.returnData.classId

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
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
                  this.listenLoading = false;
                  this.editFormVisible = false;
                  this.loadChooseCourseInfo();
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
                this.loadChooseCourseInfo()
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
