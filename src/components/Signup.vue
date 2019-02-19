<template>
  <div class="login-frame">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="">
    </div>
    <el-form
      ref="AccountForm"
      :model="account"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <div style="float:left">
        <span>账号</span>
      </div>
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入您的账号"></el-input>
      </el-form-item>
      <div style="float:left">
        <span>密码</span>
      </div>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="account.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="signup">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  name: "Login",
  data() {
    return {
      logining: false,
      account: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    signup() {
      let data = this.account
      let url = 'http://localhost:8080/register'
      this.$axios.post(url, data).then(rsp=>{
        console.log(rsp)
      })
    }
  }
};
</script>

<style>
.login-container {
  width: 350px;
  margin: auto;
}
.logo {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}
.logo img {
  width: 70%;
  height: auto;
}
</style>