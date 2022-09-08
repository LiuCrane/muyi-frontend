<template>
  <div class="page">
    <div class="search">
      <div class="item">
        <div class="label">店长</div>
        <el-input v-model="manager_name" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <div class="label">门店</div>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="searchBtn" @click="search">搜索</div>
    </div>
    <div class="main">
      <div class="title">门店管理</div>
      <PageTable
        :indexShow="false"
        :tableData="tableData"
        :tableLabel="tableLabel"
        :pager="pager"
        @pagination="loadTable"
        @handleButton="tableBtnHandle(arguments)"
      >
        <template #edit="val">
          <div @click="edit(val.data)">
            <svg-icon icon-class="Edit" className="Edit"></svg-icon>
          </div>
        </template>
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
        <el-button type="primary" @click="submit">修 改</el-button>
        <el-button @click="cancel" type="danger">注 销</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { storesList, storesUpdate, cancel } from "@/api/api.js";
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
        { label: "店长姓名", param: "manager_name" },
        { label: "门店名称", param: "name" },
        { label: "手机", param: "manager_phone" },
        { label: "地址", param: "address" },
        { label: "学员数量", param: "student_num" },
        { label: "浏览记录", param: "last_browse_date" },
        { label: "修改", type: "custom", param: "edit" },
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
    handleClose() {
      this.dialogVisible = false;
    },
    loadTable() {},
    edit(data) {
      this.ruleForm = { ...data };
      this.dialogVisible = true;
    },
    search() {
      storesList({ manager_name: this.manager_name, name: this.name }).then(
        (res) => {
          this.tableData = res.data.list;
          this.pager.total = res.data.total;
        }
      );
    },
    cancel() {
      cancel(this.ruleForm.id).then((res) => {
        this.search();
        this.$message({
          message: "注销成功！",
          type: "success",
        });
        this.dialogVisible = false;
      });
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          storesUpdate(this.ruleForm.id, {
            ...this.ruleForm,
          }).then((res) => {
            this.search();
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
          });
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