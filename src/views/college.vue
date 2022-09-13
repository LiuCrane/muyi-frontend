<template>
  <div class="page">
    <div class="search">
      <div class="item">
        <div class="label">姓名</div>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="searchBtn" @click="search">搜索</div>
    </div>
    <div class="main">
      <div class="title">学员管理</div>
      <PageTable :indexShow="false" :tableData="tableData" :tableLabel="tableLabel" :pager="pager"
        @pagination="loadTable" @handleButton="tableBtnHandle(arguments)" >
        <template #edit="val">
          <div @click="view(val.data)">
            <svg-icon icon-class="bigeye" className="Edit"></svg-icon>
          </div>
        </template>
      </PageTable>
    </div>
    <el-drawer title="学生信息" :visible.sync="drawer" size="60%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px"
        class="demo-ruleForm">
        <el-row >
          <el-col :span="8" class="cardInfo">
            <el-form-item label="姓名:" prop="manager_name">
              <label type="info">{{this.detialData.name}}小六</label>
            </el-form-item>
            <el-form-item label="性别:" prop="manager_phone">
              <label type="info">{{detialData.sex}}男</label>
            </el-form-item>
            <el-form-item label="年龄:" prop="address">
              <label type="info">{{detialData.age}}12</label>
            </el-form-item>
            <el-form-item label="家长姓名:" prop="parent_name">
              <label type="info">{{detialData.parent_name}}大刘</label>
            </el-form-item>
            <el-form-item label="地址:" prop="address">
              <span type="info">{{detialData.address}}xxx省xxx市xx区xx路xxxx小区xx栋1单元505</span>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-table :data="detialData.eyesight_list" height="850" border  :cell-style="{padding:'2px'}">
              <!-- <el-table-column prop="created_at" label="检测次疗愈" :formatter="formatDate" width="200"> -->
                <el-table-column prop="created_at" label="检测次疗愈"  width="150">

              </el-table-column>
              <el-table-column prop="left_vision" label="左眼视力">
              </el-table-column>
              <el-table-column prop="right_vision" label="右眼视力">
              </el-table-column>
              <el-table-column prop="vision" label="双眼视力">
              </el-table-column>
              <el-table-column prop="improved" label="视力提升" >
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.improved === 'yes' ? 'success' : 'info'"
                      disable-transitions>{{scope.row.improved}}</el-tag>
                  </template>

              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
import { students, studentInfo } from "@/api/api.js";
import PageTable from "@/components/pageTable.vue";
import { formatDateTime } from "../common/js/data"
export default {
  components: {
    PageTable: PageTable,
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        manager_name: [
          { required: true, message: "请输入店长姓名", trigger: "blur" },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        name: [{ required: true, message: "请输入门店名称", trigger: "blur" }],
        manager_phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      drawer: false,
      manager_name: "",
      name: "",
      tableData: [], // table数据
      tableLabel: [
        { label: "编号", param: "id" },
        { label: "姓名", param: "name" },
        { label: "家长姓名", param: "parent_name" },
        { label: "手机", param: "parent_phone" },
        { label: "地址", param: "address" },
        { label: "学习前视力", param: "first_left_vision" },
        { label: " 最新视力", param: "left_vision" },
        { label: "查看", type: "custom", param: "edit" },
      ],
      pager: {
        pageSize: 10, // 每页数据量
        currentPage: 1, // 分页  当前页
        total: 0, //列表总数
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      detialData:
        { eyesight_list: [
          { created_at: '疗愈前', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "/" },
          { created_at: '第 1 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
          { created_at: '第 2 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" }, 
          { created_at: '第 3 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第4 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 5 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 6 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 7 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 8 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 9 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 10 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 11 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 12 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 13 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 14 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 15 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 16 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 17 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 18 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 19 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "yes" },
           { created_at: '第 20 次疗愈', left_vision: "4.0", right_vision: "3.9", vision: "4.1", improved: "no" },
           { created_at: '第 21 次疗愈', left_vision: "4.5", right_vision: "4.4", vision: "4.5", improved: "yes" }
        
        ] }

      ,
      options: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "学员",
        },
      ],
      value: "",
    };
  },
  mounted() {
    this.search();
  },
  methods: {

    handleClose() { },

    loadTable(param) {
      this.pager.currentPage = param;
      this.search()
    },
    loadTableReSize(param) {
      this.pager.pageSize = param;
      this.search()
    },
    view(data) {
      studentInfo(data.id).then(
        (res) => {
          console.log(res.data)
          // this.detialData = res.data;
          this.drawer = true;
        }
      );

    },
    search() {
      students({ manager_name: this.manager_name, name: this.name }).then(
        (res) => {
          this.tableData = res.data.list;
          this.pager.total = res.data.total;
        }
      );
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //时间戳格式化
    formatDate(row) {

      return formatDateTime(row.created_at)

    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  box-shadow: 10px 10px 30px rgb(0 0 0 / 25%);
  border-radius: 30px;
}

.page {
  .search {
    display: flex;
    align-items: center;
    justify-content: right;

    .item {
      margin-left: 70px;
      display: flex;
      align-items: center;
      justify-content: right;

      &:first-child {
        margin-left: 0px;
      }

      .label {
        margin-right: 34px;
        white-space: nowrap;
      }

      ::v-deep .el-input__inner {
        height: 58px;
        line-height: 58px;
        background: #ffffff;
        border-radius: 12px;
      }

      ::v-deep .el-date-editor .el-range-separator {
        line-height: 51px;
      }
    }

    .searchBtn {
      width: 108px;
      height: 57px;
      background: #3461fd;
      border-radius: 12px;
      text-align: center;
      line-height: 57px;
      font-family: "Noto Sans SC";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      margin-left: 20px;
      cursor: pointer;
    }
  }
.el-drawer{
  .el-drawer__body{
    overflow: hidden;
  background-color: #3461fd;
  }
 
  .cardInfo {

    background: #F3F8FC;
    border-radius: 10px;
    text-align: left;
    border: 1px solid #E7F1FE;
    margin:0 15px 0 20px;

  }

  .cardInfo .el-form-item {
    margin: 0;
    padding-left: 0;
  }

  .cardInfo .el-form-item label,
  .cardInfo .el-form-item span {
    display: block;
    color: #5E646D;
  }

  .cardInfo .el-form-item span {
    padding: 8px 0;
    line-height: 22px;
  }
  .tableBox{
    th{
      padding: 0 !important;
      height:2px;
      line-height: 2px;
    }
    td{
      padding: 0 !important;
      height:2px;
      line-height: 2px;
    }
  }
}
  .main {
    margin-top: 33px;
    background: #ffffff;
    border-radius: 20px;
    padding: 14px;
    box-sizing: border-box;

    .title {
      margin: 12px 0 30px 30px;
      font-family: "Noto Sans SC";
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 35px;
      color: #000000;
    }
  }
}
</style>