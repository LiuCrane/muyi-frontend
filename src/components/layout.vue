<template>
  <div class="layout">
    <div class="menu">
      <div class="logoDiv">
        <svg-icon icon-class="bigeye" className="icon"></svg-icon>目益视力
      </div>
      <div class="menuList">
        <div
          @click="tabMenu(index)"
          class="menuItem"
          v-for="(item, index) in menuList"
          :class="{ active: menuIndex === index }"
          :key="index + 'menu'"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="footerMenu">
        <img src="@/assets/img/avatar.png" />
        <div class="name">{{ info.name }}</div>
        <div class="iconfont icon-gengduo"></div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="iconDiv">
          <svg-icon icon-class="bell" className="bell"></svg-icon>5
        </div>
      </div>
      <div class="main"><router-view></router-view></div>
    </div>
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>

<script>
export default {
  data() {
    return {
      info: {
        name: "何增辉",
      },
      menuList: [
        {
          name: "首页",
          url: "/home",
        },
        {
          name: "浏览记录",
          url: "/home",
        },
        {
          name: "门店管理",
          url: "/home",
        },
        {
          name: "媒体管理",
          url: "/home",
        },
        {
          name: "班级管理",
          url: "/home",
        },
        {
          name: "学员管理",
          url: "/home",
        },
      ],
      menuIndex: 0,
    };
  },
  methods: {
    tabMenu(index) {
      this.$cookie.set("menuIndex", index);
      this.menuIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/home");
          break;
        case 1:
          this.$router.push("/record");
          break;
        case 2:
          this.$router.push("/store");
          break;
        case 3:
          this.$router.push("/media");
          break;
        case 4:
          this.$router.push("/class");
          break;
        case 5:
          this.$router.push("/college");
          break;
      }
    },
  },
  created() {
    this.menuIndex = Number(this.$cookie.get("menuIndex"));
  },
};
</script>
<style scoped lang="scss">
.layout {
  display: flex;
  
  .menu {
    position: relative;
    background: #fff;
    width: 240px;
    height: 100vh;
    padding: 30px;
    box-sizing: border-box;
    .logoDiv {
      font-family: "Noto Sans SC";
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #000000;
      display: flex;
      align-items: center;
    }
    .menuList {
      margin-top: 100px;
      .menuItem {
        margin-bottom: 10px;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0 40px 0 20px;
        width: 180px;
        height: 52px;
        border-radius: 14px;
        font-family: "Noto Sans SC";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        color: #000000;
        line-height: 52px;
        text-align: left;
        &.active {
          background: #d7dfff;
        }
      }
    }
    .footerMenu {
      font-family: "Noto Sans SC";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      color: #000000;
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 240px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      box-sizing: border-box;
    }
  }
  .right {
    background: #F7F7F7;
    height: 102vh;
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    .top {
      display: flex;
      align-items: center;
      justify-content: right;
      margin-top: 10px;
      margin-bottom: 30px;
      .iconDiv {
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: right;
      }
    }

  }
  
}
</style>
