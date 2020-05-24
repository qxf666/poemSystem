<template>
  <el-container class="home-container">
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#5d6146"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        :router="true"
      >
        <el-menu-item index="0">
          <div class="img1">
            <img src="../assets/gushici.jpg" alt />
          </div>
        </el-menu-item>
        <el-menu-item index="/welcome">推荐</el-menu-item>
        <el-menu-item index="/user/author">诗人</el-menu-item>
        <el-menu-item index="/user/dynasty">朝代</el-menu-item>
        <el-menu-item index="/user/music">音乐</el-menu-item>
        <el-menu-item index="/user/store">收藏列表</el-menu-item>
        <el-menu-item index="/userCenter">个人中心</el-menu-item>
      </el-menu>
      <div class="inputContent">
          <el-input placeholder="请输入歌曲信息" clearable v-model="query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <div class="foot">
        <p>创始人：江西财经大学 古诗词文学社</p>
        <p>邮件地址:2938814384@qq.com</p>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
import SelectPoem from "../components/user/SelectPoem"
export default {
   components: {
    SelectPoem
  },
  data() {
    return {
      query:""
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.img1 img {
  width: 120px;
  height: 60px;
  border-radius: 1px;
}
.home-container {
  height: 100%;
}
.el-container {
  background-color: rgba(6, 30, 75, 0.37);
}
.el-main {
  background-color: #fff;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  background-color: #5d6146;
}
.el-main{
  padding:0px;
}
.foot{
  text-align: center;
  font-size: 10px;
}
.inputContent{
  width: 300px;
}
</style>