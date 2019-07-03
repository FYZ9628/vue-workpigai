<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="作业详情列表" style="margin-top: 10px">
      </el-page-header>
    </el-header>

    <el-main style="margin-left: auto; margin-right: auto;">
        <el-table
          :data="tableData"
          style="width: 1400px"
          height="450">
          <el-table-column
            fixed
            prop="id"
            label="序号"
            width="200" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="account"
            label="学号"
            width="200" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="name"
            label="学生姓名"
            width="200" >
          </el-table-column>
          <el-table-column
            fit="true"
            prop="score"
            label="分数"
            width="200" >
          </el-table-column>
          <el-table-column  fixed="right" label="操作" min-width="200" >

            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleCorrect(scope.$index, scope.row)">批改</el-button>
            </template>
          </el-table-column>
        </el-table>


    </el-main>
    <!--作业批改界面-->
    <el-dialog title="作业详情" :visible.sync="correctFormVisible" :append-to-body='true'>
      <el-form :model="correctForm" label-width="80px" :rules="correctFormRules" ref="detailForm">
        <el-form-item label="作业内容" >
          <el-input
            type="textarea"
            v-model="correctForm.content"
            auto-complete="off"
            :readonly="true"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="学生答案">
          <el-input
            type="textarea"
            v-model="correctForm.submit_content"
            auto-complete="off"
            :autosize="{ minRows: 8,maxRows:10}"></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input v-model="correctForm.score" auto-complete="off"readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="correctFormVisible = false">取 消</el-button>
        <el-button type="primary"style="background-color: #545c64" @click.native="detailSubmit" :loading="correctLoading">保存</el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>
    export default {
        name: "WorkDetailList",
      data() {
        return {
          input: '',
          worksDetails:'',
          tableData: [{
            id: '1',
            account:'11223344',
            name: '雪碧',
            score: '90 ',
          },
            {
              id: '2',
              account:'11223344',
              name: '雪碧',
              score: '89 ',
            },
            {
              id: '3',
              account:'11223344',
              name: '雪碧',
              score: '98 ',
            },{
              id: '4',
              account:'11223344',
              name: '雪碧',
              score: '90 ',
            },
          ],
          correctFormVisible: false,//新增界面是否显示
          correctLoading: false,
          correctFormRules: {
          },
          //新增界面数据
          correctForm: {
            content:'',
            submit_content: '',
            score: '',
          }
        }
      },

      methods: {
        goBack() {
          window.history.back()
          console.log('go back');
        },
        //显示批改界面
        handleCorrect: function (index, row) {
          this.correctFormVisible = true;
          this.correctForm = Object.assign({}, row);
        },
      }
    }

</script>

<style scoped>

</style>
