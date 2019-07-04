<template>
    <div>
      <el-container>
        <el-header style="padding-top: 20px;padding-left: 50px;text-align:left;">
        <div >

          <el-input
            @keyup.enter.native="searchClick"
            placeholder="请输入发布教师、作业标题"
            prefix-icon="el-icon-search"
            size="medium"
            style="width: 400px;margin-right: 10px"
            v-model="keywords">
          </el-input>
          <el-button size="medium" type="primary" icon="el-icon-search"
                     style="background-color: #545c64" @click="searchClick">搜 索</el-button>

<!--          <el-input style="width: 300px" v-model="input" placeholder="请输入内容"></el-input>-->
<!--          <el-button type="primary" style="background-color: #545c64" v-on:click="getUsers">查询</el-button>-->

        </div>

        </el-header>

        <el-aside width="20px">
        </el-aside>
        <el-main style="padding-top: 10px;padding-left: 50px">
          <el-table
            :data="works"
            style="width: 100%"
            height="450">
            <el-table-column
              fixed
              prop="id"
              label="序号"
              width="100" >
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              fit="true"
              prop="teacher.name"
              label="发布教师"
              width="150">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="workDetail.workTitle"
              label="作业标题"
              width="200">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="startTime"
              label="发布日期"
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
              width="100">
            </el-table-column>
            <el-table-column
              fit="true"
              prop="score"
              label="分数"
              width="100">
            </el-table-column>
            <el-table-column  fixed="right" min-width="200" label="操作" >
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="handleDetail(scope.$index, scope.row)">作业详情</el-button>
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


      <!--查看答案界面-->
      <el-dialog title="作业答案" :visible.sync="checkFormVisible" :append-to-body='true'>
        <el-form :model="checkForm" label-width="80px" :rules="checkFormRules" >

          <el-form-item label="作业内容" >
            <el-input
              type="textarea"
              v-model="checkForm.content"
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
    name: 'StudentIndex',
    components: {
       },
    data() {
      return {
        input: '',
        account:localStorage.getItem("account"),
        works: [],
        keywords: '',
        searchResult: [],
        listenLoading: false,


        checkFormVisible: false,//查看答案界面是否显示
        checkLoading: false,
        checkFormRules: {
        },
        //查看答案界面数据
        checkForm: {
          // content:'作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容' +
          //   '作业内容作业内容作业内容作业内容作业内容作业内容作业内容作业内容',
          // answer:'答案内容答案内容答案内容答案内容答案内容答案内容答案内容答案内容',

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
      //请求加载学生作业信息
      loadWorkInfo () {
        let _this = this
        // this.$axios.get('/workInfo').then(resp => {
        //   if (resp && resp.status === 200) {
        //     _this.works = resp.data;
        //   }
        // });

        this.$axios
          .post('/getStudentPersonalWork', {
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
          .post('/searchStudent', {
            keywords: this.keywords
          }).then(resp => {
          if (resp && resp.status === 200) {
            _this.searchResult = resp.data;
            _this.works = _this.searchResult;

          }
        })

      },



      //显示查看作业答案界面
      handleCheck: function (index, row) {
        this.checkFormVisible = true;
        //this.checkForm = Object.assign({}, row);
        this.checkForm = {
          content:row.workDetail.publishContent,
          answer:row.workDetail.answer,
        };
      },

      //点击跳转到显示详情界面，传递参数过去，在详情界面需要接受
      handleDetail: function (index, row) {
        this.$router.push({
          path: '/workDetail',
          // name: 'mallList',
          query: {
            data: row
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
