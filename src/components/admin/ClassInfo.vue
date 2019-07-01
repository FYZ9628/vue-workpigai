<template>
    <div>
      <el-container>
        <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >

          <el-input
            @keyup.enter.native="searchClick"
            placeholder="通过班级名或ID搜索..."
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
              prop="classId"
              label="班级号"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="className"
              label="班级名"
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
                  @click.native="deleteClass(scope.$index, scope.row)" :loading="listenLoading">删除</el-button>
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
      <el-dialog title="新增班级信息" :visible.sync="addFormVisible" :append-to-body='true'>
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="班级号" prop="classId">
            <el-input v-model="addForm.classId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级名" prop="className">
            <el-input v-model="addForm.className" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary"style="background-color: #545c64" @click.native="addSubmit" :loading="listenLoading">提 交</el-button>
        </div>
      </el-dialog>

      <!--编辑界面-->
      <el-dialog title="编辑班级信息" :visible.sync="editFormVisible" :append-to-body='true'>
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="班级号" prop="classId">
            <el-input v-model="addForm.classId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级名" prop="className">
            <el-input v-model="addForm.className" auto-complete="off"></el-input>
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
    name: 'ClassInfo',
    components: {
       },
    data() {
      return {
        tableData: [{
          id: '1',
          classId:'20160021',
          className: '16软件',
        },
          {
            id: '2',
            classId:'20170021',
            className: '17软件',
          },],
        input: '',
        teachers: [], //教师信息
        user:{
          id: '',
          account: '',
          password: '',
          type: ''
        },
        keywords: '',
        searchResult: [],
        listenLoading: false,

        editFormVisible: false,//编辑界面是否显示
        editFormRules: {
          classId: [
            { required: true, message: '请输入班级号', trigger: 'blur' }
          ],
          className: [
            { required: true, message: '请输入班级名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: '',
          classId: '',
          className: '',
        },

        addFormVisible: false,//新增界面是否显示
        addFormRules: {
          classId: [
            { required: true, message: '请输入班级号', trigger: 'blur' }
          ],
          className: [
            { required: true, message: '请输入班级名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          id: '',
          classId: '',
          className: '',

        }
      }
    },

    // mounted，组件挂载后，此方法执行后，页面显示
    mounted: function () {
      this.loadTeacherInfo();
      this.editSubmit();
    },

    methods: {
      //请求加载教师信息
      loadTeacherInfo () {
        let _this = this
        this.$axios.get('/teacherInfo').then(resp => {
          if (resp && resp.status === 200) {
            _this.teachers = resp.data;
          }
        })
      },

      //查询
      searchClick () {
        let _this = this;
        this.$axios
          .post('/searchTeacher', {
            keywords: this.keywords
          }).then(resp => {
          if (resp && resp.status === 200) {


            _this.searchResult = resp.data;

            _this.teachers = _this.searchResult;
            this.loadTeacherInfo ();

            console.log(resp.data);
            console.log(_this.searchResult);
            console.log("搜索测试");
            console.log("搜索测试");
            console.log("搜索测试");
            console.log("搜索测试");
            console.log("搜索测试");

          }
        })

      },


      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          id: '100',
          account: '',
          name: '',
          sex: '男',
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.listenLoading = true;

              // this.user.id = 88; id是自增的，所以当没有的时候就会默认地往后排序号
              this.user.account = "T116263000203";
              this.user.password = "123456";
              this.user.type = 2;

              this.$axios
                .post('/addTeacher', {
                  // id: 12, id是自增的，所以当没有的时候就会默认地往后排序号
                  user: this.user,
                  name: "编辑测试",
                  sex: "男",
                }).then(resp => {
                if (resp && resp.status === 200) {
                  this.listenLoading = false;
                  this.addFormVisible = false;
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
          id: '100',
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

      //删除班级
      deleteClass: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
            this.listenLoading = true;
            this.$axios     //{id: row.id}
              .post('/deleteTeacher', {id: 18}).then(resp => {
              if (resp && resp.data.code === 100) {
                this.listenLoading = false;
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.loadTeacherInfo()
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
