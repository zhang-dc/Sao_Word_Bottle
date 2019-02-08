<template>
  <div class="index-container">
    <div class="header-container">
      <img src="../assets/images/头部.jpg">
    </div>
    <div class="body-container">
      <div class="message-container" v-for="item in bottleList" :key="item.bottleUUID">
        <div class="title">
          {{item.from}}
        </div>
        <div class="last-message">
          {{item.content}}
        </div>
      </div>
    </div>
    <div class="footer-container">
      <img src="../assets/images/尾部.jpg">                                 
    </div>
  </div>
</template>
<script>
import Store from '@/util/Store'
export default {
  name: 'Index',
  data () {
    return {
      bottleList: null
    }
  },
  created () {
    document.title = '消息列表'
    Store.connectSocket('test')
    Store.onBottleListChange = () => {
      setTimeout(()=>{
        console.log(Store.bottleList)
        this.bottleList = Store.bottleList
      },100)
    }
  },
  mounted () {
    setTimeout(()=>{
      Store.getBottleList()
    },1000);
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
  border-bottom: lightsalmon 1px solid;
  border-left: lightsalmon 1px solid;
}
.title {
  width: 100%;
  height: 60%;
  font-size: 1.6rem;
  font-weight: lighter;
}
.last-message {
  width: 100%;
  height: 40%;
  color: grey;
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
