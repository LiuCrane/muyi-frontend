<template>
  <div class="page">
    <div class="search">
      <div class="item">
        <div class="label">媒体标题</div>
        <el-input v-model="title" placeholder="请输入媒体标题"></el-input>
      </div>
      <div class="searchBtn" @click="search">搜索</div>
    </div>
    <div class="main">
      <div class="title">
        <div>媒体管理</div>
        <div @click="add">
          <svg-icon icon-class="Plus_circle" className="Edit"></svg-icon>
        </div>
      </div>
      <PageTable
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
        <template #delete="val">
          <div @click="deleteRow(val.data)">
            <svg-icon icon-class="Trash" className="Edit"></svg-icon>
          </div>
        </template>
      </PageTable>
    </div>
    <el-dialog
      title="媒体管理"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="item in fileType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时长" prop="duration">
          <el-input v-model="ruleForm.duration"></el-input>
        </el-form-item>
        <el-form-item label="源文件" prop="url">
          <el-input v-model="ruleForm.url" placeholder="媒体链接，请在cos 获取"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="img">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-progress="getTmp_secret_keys"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose2"
    >
      <span>是否确认删除该数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="mediaDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  mediaList,
  uploadInfo,
  mediaUpdate,
  mediaDelete,
  categories,
  newMedia,
} from "@/api/api.js";
import PageTable from "@/components/pageTable.vue";
export default {
  components: {
    PageTable: PageTable,
  },
  data() {
    return {
      newData: false,
      options: [],
      fileType:[{value:'VIDEO',label:'视频'},{value:'AUDIO',label:'音频'}],
      url: "",
      dialogVisible: false,
      dialogVisible2: false,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }],
        duration: [{ required: true, message: "请输入时长", trigger: "blur" }],
        url: [{ required: true, message: "请输入源文件", trigger: "blur" }],
        img: [{ required: true, message: "请输入封面", trigger: "blur" }],
      },
      ruleForm: {
        img: "",
      },
      title: "",
      tableData: [], // table数据
      tableLabel: [
        { label: "行号", param: "name" },
        { label: "名称", param: "title" },
        { label: "类型", param: "type" },
        { label: "简介", param: "description" },
        { label: "分类", param: "category" },
        { label: "时长", param: "duration" },
        { label: "编辑", type: "custom", param: "edit" },
        { label: "删除", type: "custom", param: "delete" },
      ],
      pager: {
        pageSize: 10, // 每页数据量
        currentPage: 1, // 分页  当前页
        total: 11, //列表总数
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      imageUrl: "",
      uploadFile: "",
      key: "",
    };
  },
  methods: {
    add() {
      this.imageUrl = "";
      this.newData = true;
      this.ruleForm = {};
      this.dialogVisible = true;
      console.log("添加")
    },
    mediaDelete() {
      mediaDelete(this.ruleForm).then((res) => {
        this.search();
        this.$message({
          message: "修改成功！",
          type: "success",
        });
        this.dialogVisible2 = false;
      });
    },
    submit() {
      if (this.newData) {
        let data = { ...this.ruleForm };
        data.duration_actual = data.duration;
        data.category_id = data.category;
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            newMedia({ ...data }).then((res) => {
              this.search();

              this.dialogVisible = false;
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        let data = { ...this.ruleForm };
        data.duration = data.duration.slice(6);
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            mediaUpdate(this.ruleForm.id, { ...data }).then((res) => {
              this.search();
              this.dialogVisible = false;
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClose2() {
      this.dialogVisible2 = false;
    },
    loadTable() {},
    search() {
      mediaList({
        title: this.title,
      }).then((res) => {
        console.log( res.data)
        this.tableData = res.data.list;
        this.pager.total = res.data.total;
      });
    },
    edit(data) {
      this.newData = false;
      this.ruleForm = { ...data };
      this.dialogVisible = true;
    },
    deleteRow(data) {
      this.ruleForm = data;
      this.dialogVisible2 = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.uploadFile = file;
    },
    // 上传文件
    getTmp_secret_keys(event, file, fileList) {
      uploadInfo({
        file_type: "IMAGE",
        filename: file.raw.name,
      }).then((res) => {
        this.url = res.data.url;
        this.key = res.data.key;
        let that = this;
        var data = new FormData();
        data.append("file", file); //获取文件
        var config = {
          onUploadProgress: function (progressEvent) {
            //上传进度
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          },
        };
        axios
          .put(this.url, data, config)
          .then(function (res) {
            that.imageUrl = URL.createObjectURL(file.raw);
            that.ruleForm.img = that.key;
          })
          .catch(function (err) {});
      });
    },
  },
  mounted() {
    this.search();
    categories().then((res) => {
      this.options = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  box-shadow: 10px 10px 30px rgb(0 0 0 / 25%);
  border-radius: 30px;
}
.avatar-uploader {
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
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