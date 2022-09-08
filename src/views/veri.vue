<template>
  <div class="page">
    <div class="search">
      <div class="item">
        <el-input v-model="key_word" placeholder="请输入搜索内容"></el-input>
      </div>
      <div class="searchBtn" @click="search">搜索</div>
    </div>
    <div class="main">
      <div class="title">
        申请审核
      </div>
      <el-tabs v-model="type" @tab-click="search">
          <el-tab-pane label="门店申请" name="STORE" >
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="id" label="编号" width="60">
              </el-table-column>
              <el-table-column prop="store_manager" label="店长姓名" width="180">
              </el-table-column>
              <el-table-column prop="store_name" label="门店名称" width="380">
              </el-table-column>
              <el-table-column prop="store_manager_phone" label="手机号码" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="store_address" label="地址" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="primary" @click="agree(scope.row.id)">同意</el-button>
                  <el-button type="danger" plain @click="disagree(scope.row.id)">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="学习申请" name="STUDY">           
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="id" label="编号" width="60">
              </el-table-column>
           
              <el-table-column prop="store_manager" label="店长姓名" width="180">
              </el-table-column>
              <el-table-column prop="store_name" label="门店名称" width="380">
              </el-table-column>
              <el-table-column prop="store_manager_phone" label="手机号码" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="store_address" label="地址" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="stage" label="申请阶段" show-overflow-tooltip>  </el-table-column>
               
              <el-table-column prop="" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="primary" @click="agree(scope.row.id)">同意</el-button>
                  <el-button type="danger" plain @click="disagree(scope.row.id)">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>


    </div>

    <!-- 修改弹出框 -->
    <el-dialog title="门店管理" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="店长姓名" prop="manager_name">
          <el-input v-model="ruleForm.manager_name"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="manager_phone">
          <el-input v-model="ruleForm.manager_phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="操作" prop="name">
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
import { veriList, veriRequest } from "@/api/api.js";
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
      type: "STORE",
      name: "",
      key_word: "",
      tableData: [], // table数据
      tableLabel: [
        { label: "编号", param: "id" },
        { label: "店长姓名", param: "store_manager" },
        { label: "门店名称", param: "store_name" },
        { label: "手机", param: "store_manager_phone" },
        { label: "地址", param: "store_address" },
        //  { label: "申请时间", param: "created_at"  },
        { label: "操作", param: "edit" },
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
    loadTable() { },
    edit(data) {
      this.ruleForm = { ...data };
      this.dialogVisible = true;
    },
    handleClick(){
      // search()
      console.log(this.name)
    },
    search() {
      veriList({ type: this.type, key_word: this.key_word }).then(
        (res) => {
          console.log("type:" + this.type,)
          this.tableData = res.data.list;
          this.pager.total = res.data.total;
        }
      );
    },
    agree(val) {
      //  console.log({ids:val,result:'true',type:this.type})
      veriRequest({ids:[val],result:'true',type:this.type}).then(
        (res) => {
          this.$message({
            message: "申请已通过！",
            type: "success",
          });
        }
      );
    },
    disagree(val) {
      veriRequest({ids:[val],result:'false',type:this.type}).then(
        (res) => {
          this.$message({
            message: "申请已拒绝",
            type: "info",
          });
        }
      );
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
    handleSelectionChange(){

    },
    cancel(){}
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