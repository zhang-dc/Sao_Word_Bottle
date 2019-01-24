<template>
  <div class="index-container">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="">
    </div>
    <div class="mybottles">
       ← 我的瓶子
    </div>
    <div class="tobeach">
      去海滩
      <br>
      ↓
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {

    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style scoped>
@font-face{
  font-family: 'Seto';
  src: url('../assets/fonts/Seto.ttf');
  font-weight: normal;
  font-style: normal;
}
.index-container {
  width: 100%;
  height: 100%;
  background: url('../assets/images/主页背景.png') no-repeat;
  background-size: 100% 100%;
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
.mybottles {
  margin-left: 40%;
  width: 60%;
  height: 40%;
  font-size: 2.6rem;
  font-family: 'Seto';
  font-weight: bold;
  color: lightgreen;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.tobeach {
  width: 100%;
  height: 30%;
  font-size: 2rem;
  font-family: 'Seto';
  color: aliceblue;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
