<template>
  <div class="index-container">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="">
    </div>
    <div class="list-container">
      <div class="list-button-container">
        <div class="list-button">
          <img src="../assets/images/漂流瓶00.png">
        </div>
      </div>
      <div class="mybottles-container">
        <div class="mybottles">
          ←我的瓶子
        </div>
      </div>
    </div>
    <div class="tobeach">
      去海滩
      <br>
      ↓
    </div>
    <div class="beach-container">
      <div class="beach-button" @click="Tobeach" :class="isToBeach">
        <img src="../assets/images/网兜00.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      isToBeach: 'noToBeach',
    }
  },
  methods: {
    Tobeach () {
      this.isToBeach = 'toBeach'
      setTimeout(()=>{
        this.$router.push('/getbottle')
      },700);
    }
  },
  created () {

  }
}
</script>

<style scoped>
@font-face{
  font-family: 'Seto';
  src: url('../assets/fonts/Seto.ttf') format('truetype');
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
.list-container {
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.list-button-container {
  width: 40%;
  height: 100%;
  z-index: 2;
  position: relative;
}
.list-button {
  position: absolute;
  right: 0;
  top: 15%;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background: rgb(247,76,48);
  border: 1px rgb(247,76,48) solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.list-button img {
  animation: shinning 4s;
  animation-iteration-count: infinite;
}
.mybottles-container {
  width: 60%;
  height: 100%;
  font-family: 'Seto';
  font-size: 2.4rem;
  font-weight: bold;
  color: lightgreen;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.mybottles {
  margin-bottom: 9rem;
}
.tobeach {
  width: 100%;
  height: 20%;
  font-family: 'Seto';
  font-size: 2.4rem;
  color: aliceblue;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.beach-container {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.beach-button {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
.beach-button img {
  width: 100%;
  height: 100%;
}
.noToBeach {
  animation: LRswing 2s;
  animation-iteration-count: infinite;
}
.toBeach {
  animation: FastRoll 0.8s;
}
@keyframes shinning
{
  0% {
    width: 1.8rem;
    height: 1.8rem;
  }
  50% {
    width: 2.4rem;
    height: 2.4rem;
  }
  100% {
    width: 1.8rem;
    height: 1.8rem;
  }
}
@keyframes LRswing {
  0% {
    transform:rotate(25deg);
  }
  50% {
    transform:rotate(-25deg);
  }
  100% {
    transform:rotate(25deg);
  }
}
@keyframes FastRoll {
  0% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(-360deg);
  }
}
</style>
