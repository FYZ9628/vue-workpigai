<template>
  <div>
    <el-container>
      <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >

          <el-input
            @keyup.enter.native="searchClick"
            placeholder="通过作业标题搜索..."
            prefix-icon="el-icon-search"
            size="medium"
            style="width: 400px;margin-right: 10px"
            v-model="keywords">
          </el-input>
          <el-button size="medium" type="primary" icon="el-icon-search" style="background-color: #545c64"
                     @click="searchClick">搜 索</el-button>

        </div>

      </el-header>

      <el-aside width="20px">
      </el-aside>
      <el-main style="padding-top: 10px;padding-left: 50px">
        <el-table
          :data="works"
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
            prop="workDetail.workTitle"
            label="作业标题"
            width="200">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="student.mClass.className"
            label="发布班级"
            width="200">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="startTime"
            label="发布时间"
            width="200">
          </el-table-column>

          <el-table-column
            fit="true"
            prop="endTime"
            label="截止时间"
            width="200">
          </el-table-column>
          <el-table-column
            fit="true"
            prop="process"
            label="完成进度"
            width="200">
            <el-progress :width="45" :height="45" type="circle" :percentage="processData.process" ></el-progress>
          </el-table-column>
          <el-table-column  fixed="right" label="操作" min-width="200" >

            <template slot-scope="scope">
              <el-button
                size="small"
                @click.native="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                size="small"
                type="danger"
                @click.native="handleDelete(scope.$index, scope.row)">删除</el-button>
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


  </div>
</template>

<script>



  export default {
    name: 'TeacherWork',
    components: {},
    data() {
      return {
        input: '',
        works:'',
        keywords: '',
        account:localStorage.getItem("account"),
        // 完成进度数据
        processData:{
          process:'25'
        },
      }
    },

    // mounted，组件挂载后，此方法执行后，页面显示
    mounted: function () {
      this.loadWorkInfo();
      console.log("测试"+account)
      console.log("测试"+account)
      console.log("测试"+account)
      console.log("测试"+account)
      console.log("测试"+account)
    },

    methods: {

      //点击跳转到显示详情界面，传递参数过去，在详情界面需要接受
      handleDetail: function (index, row) {

        this.$router.push({
          path: '/workDetailList',
          // name: 'mallList',
          query: {
            data: row
          }
        })
      },
      //请求加载作业信息
      loadWorkInfo () {
        let _this = this
        // this.$axios.get('/workInfo').then(resp => {
        //   if (resp && resp.status === 200) {
        //     _this.works = resp.data;
        //   }
        // });

        this.$axios
          .post('/getTeacherPersonalWork', {
            keywords: this.account
          }).then(resp => {
          if (resp && resp.status === 200) {
            _this.works = resp.data;

          }
        })

      },

      //查询
      searchClick () {
        let _this = this;
        this.$axios
          .post('/searchWork', {
            keywords: this.keywords
          }).then(resp => {
          if (resp && resp.status === 200) {
            _this.searchResult = resp.data;
            _this.works = _this.searchResult;

            let tempWorkList = [];
            for (let i = 0; i < _this.searchResult.length; i++) {
              if (_this.searchResult[i].teacher.user.account == this.account){
                tempWorkList.push(_this.searchResult[i]);
              }
            }
            _this.works = tempWorkList;

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
