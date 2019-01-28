<template>
  <div class="index-container">
    <div class="header-container">
      <img src="../assets/images/头部.jpg">
    </div>
    <div class="body-container">
      <div class="message-container" v-for="i in 10" :key="i">
        <div class="title">
          {{i}}
        </div>
        <div class="last-message">
          {{i}}
        </div>
      </div>
    </div>
    <div class="footer-container">
      <img src="../assets/images/尾部.jpg">
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
  created () {
    document.title = '消息列表'
  }
}
</script>

<style scoped>
.index-container {
  width: 100%;
  height: 100%;
  background: rgb(245,215,175);
  overflow-x: hidden;
  overflow-y: scroll;
}
.header-container {
  width: 100%;
  height: 19.5%;
}
.header-container img {
  width: 100%;
  height: 100%;
}
.body-container {
  width: 100%;
  min-height: 70%;
  background-image: url('../assets/images/中部.jpg');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.message-container {
  width: 70%;
  height: 4rem;
}
.footer-container {
  width: 100%;
  height: 10%;
}
.footer-container img {
  width: 100%;
  height: 100%;
}
</style>
