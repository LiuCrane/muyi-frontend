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
      <PageTable
        :indexShow="false"
        :tableData="tableData"
        :tableLabel="tableLabel"
        :pager="pager"
        @pagination="loadTable"
        @handleButton="tableBtnHandle(arguments)"
      >
      </PageTable>
    </div>
    <el-dialog
      title="门店管理"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店长" prop="manager_name">
          <el-input v-model="ruleForm.manager_name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="manager_phone">
          <el-input v-model="ruleForm.manager_phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { studentList } from "@/api/api.js";
import PageTable from "@/components/pageTable.vue";
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
      manager_name: "",
      name: "",
      tableData: [], // table数据
      tableLabel: [
        { label: "编号", param: "number" },
        { label: "姓名", param: "name" },
        { label: "家长姓名", param: "parent_name" },
        { label: "手机", param: "parent_phone" },
        { label: "地址", param: "address" },
        { label: "学习前视力", param: "startTime" },
        { label: " 最新视力", param: "endTime" },
      ],
      pager: {
        pageSize: 10, // 每页数据量
        currentPage: 1, // 分页  当前页
        total: 0, //列表总数
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
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
    handleClose() {},
    loadTable() {},
    edit(data) {
      this.ruleForm = data;
      this.dialogVisible = true;
    },
    search() {
      studentList({
        title: this.name,
      }).then((res) => {
        this.tableData = res.data.list;
        this.pager.total = res.data.total;
      });
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