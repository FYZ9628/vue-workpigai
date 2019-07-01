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
            width="100" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="workTitle"
            label="作业标题"
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
        tableData: [{
          id: '1',
          workTitle:'11223344',
          startTime: '2019-6-25 13:00:00',
          endTime: '2019-6-25 13:00:00 ',
        },
],


        // 完成进度数据
        processData:{
          process:'25'
        },
      }
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
