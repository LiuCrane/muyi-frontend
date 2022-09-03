<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/api.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "admin",
        password: "my@admin",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          login({
            username: this.form.name,
            password: this.form.password,
          })
            .then((res) => {
              this.$cookie.set("menuIndex", 0);
              this.$cookie.set("token", res.data.token);
              this.$router.push("/");
            })
            .catch((err) => {});
        } else {
          this.$message({
            message: "用户名或密码错误",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 350px;
  margin: 120px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
}

.login-title {
  text-align: center;
}
</style>

