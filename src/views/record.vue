<template>
  <div class="page">
    <div class="search">
      <div class="item">
        <div class="label">用户</div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <div class="label">时间</div>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="searchBtn" @click="search">开始</div>
    </div>
    <div class="main">
      <div class="title">浏览记录</div>
      <PageTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :pager="pager"
        @pagination="loadTable"
        @handleButton="tableBtnHandle(arguments)"
      ></PageTable>
    </div>
  </div>
</template>

<script>
import { browseRecords, simple_users } from "@/api/api.js";
import PageTable from "@/components/pageTable.vue";
export default {
  components: {
    PageTable: PageTable,
  },
  data() {
    return {
      userList: [],
      tableData: [], // table数据
      tableLabel: [
        { label: "人员", param: "user_name" },
        { label: "电话", param: "user_phone" },
        { label: "媒体名称", param: "media_title" },
        { label: "类型", param: "media_type" },
        { label: "简介", param: "media_description" },
        { label: "起始时间", param: "start_time" },
        { label: "结束时间", param: "end_time" },
        { label: "时长", param: "total_time" },
        { label: "读取地点", param: "location" },
      ],
      pager: {
        pageSize: 10, // 每页数据量
        currentPage: 1, // 分页  当前页
        total: 0, //列表总数
      },
      value1: [],
      value: "",
    };
  },
  methods: {
    loadTable() {},
    search() {
      browseRecords({
        user_id: this.value,
        start_time: this.value1[0],
        end_time: this.value1[1],
      }).then((res) => {
        this.tableData = res.data.list;
        this.pager.total = res.data.total;
      });
    },
  },
  mounted() {
    this.search();
    simple_users().then((res) => {
      this.userList = res.data;
    });
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
      cursor: pointer;
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