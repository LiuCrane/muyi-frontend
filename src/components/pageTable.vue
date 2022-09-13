<template>
  <div>
    <el-table
      ref="table"
      element-loading-text="Loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        v-if="indexShow"
        label="行号"
        type="index"
        align="center"
        :index="getIndex"
      ></el-table-column>
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in tableLabel"
        :width="item.width ? item.width : ''"
        :key="index"
        :align="item.align ? item.align : 'center'"
        :label="item.label"
        :prop="item.param"
      >
        <template slot-scope="scope">
          <!-- 自定义 -->
          <template v-if="item.type == 'custom'">
            <slot :name="item.param" :data="scope.row" :column="item" />
          </template>
          <template v-else>
            <span v-if="item.render" style="color: #606266">
              {{ item.render(scope.row) }}
            </span>
            <span v-else style="color: #606266">{{
              scope.row[item.param]
            }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableOption.label"
        :width="tableOption.width ? tableOption.width : ''"
        :label="tableOption.label"
        align="center"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in tableOption.options"
            :key="index"
            :type="item.type ? item.type : 'text'"
            :icon="item.icon ? item.icon : ''"
            @click="handleButton(item.methods, scope.row)"
            size="small"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;margin: 20px 0;"
      :page-sizes="[5, 10, 15, 20]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-lick="prevClick"
      @next-lick="nextClick"
      :current-page.sync="pager.currentPage"
      :page-size.sync="pager.pageSize"
      :hide-on-single-page="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pager.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    indexShow: {
      type: Boolean,
      default: true,
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => {
        return [];
      },
    },
    tableLabel: {
      // label信息
      type: Array,
      default: () => {
        return [];
      },
    },
    tableOption: {
      // 操作数据
      type: Object,
      default: () => {
        return {};
      },
    },
    showSelection: {
      // 是否显示复选框
      type: Boolean,
      default: false,
    },
    pager: {
      // 分页信息
      type: Object,
      default: function () {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        };
      },
    },
  },
  methods: {
    getIndex(index) {
      return (this.pager.currentPage - 1) * this.pager.pageSize + 1 + index;
    },
    // 触发自定义按钮操作
    handleButton(method, row) {
      this.$emit("handleButton", method, row);
    },
    // 获取所有的复选框选项
    getAllSelections() {
      return this.$refs.table.selection;
    },
    // size发生变化时，令currentPgae为1，并发送自定义事件
    handleSizeChange(val) {
      this.pager.currentPage = 1;
      this.$emit("paginationReSize", val);
    },
    // currentPage发生变化时，发送自定义事件
    handleCurrentChange(val) {
      this.$emit("pagination", val);
    },
    prevClick(val){
      this.pager.currentPage -=1
      this.$emit("pagination", val);
    },
    nextClick(val){
      this.pager.currentPage +=1
      this.$emit("pagination", val);
    }
  },
};
</script>
<style>
  el-pagination{
    margin-top: 15px;
  }
</style>