<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    //这是登录表单的数据绑定
    return {
      loginForm: {
        username: "",
        password: ""
      },
      //这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击重置按钮表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        console.log("1是否发起请求");
        if (!valid) return;
        console.log("2是否发起请求");
        const { data: resp } = await this.$http.post(
          "user/login",
          this.loginForm
        );
        console.log(resp);
        if (resp.meta.status !== 200) {
          return this.$message.error("登录失败");
        } else {
          // 1.将登录成功的token保存到客户端的sessionStorage中
          //  1.1 项目中除了登录之外的API接口，必须在登录之后才能访问
          //  1.2 token 只应当在当前网站打开期间生效，所以将token保存在sessionStorage中
          window.sessionStorage.setItem('token',resp.data.token);
          this.$message.success("登录成功");
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: gainsboro;
  height: 100%;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd; //给盒子向外加阴影
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: gainsboro;
      }
    }
  }
}
.login_form {
  position: absolute;
  width: 100%;
  bottom: 10px;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>