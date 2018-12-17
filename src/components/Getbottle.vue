<template>
  <div class="index-container">
    <div class="sky-container">
      <img src="../assets/images/蓝天.jpg">
    </div>
    <div class="beach-container">
      <img src="../assets/images/海滩.jpg">
    </div>
    <div class="net-container">
      <img src="../assets/images/网兜.png">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'getbottle',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
  .index-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .sky-container, .beach-container {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .sky-container {
    height: 46.71%;
    background: url('../assets/images/蓝天.jpg') 100% 100%;
    z-index: 1;
  }

  .beach-container {
    height: 53.29%;
    z-index: 3;
  }

  .sky-container img, .beach-container img {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .net-container{
    width: 90%;
    position: absolute;
    animation: getBottle 4s linear;
    animation-fill-mode: forwards;
    z-index: 2;
  }

  .net-container img{
    width: 30%;
    margin-left: 35%;
  }

  @keyframes getBottle
  {
    0%   {
      top: 20%;
      transform:rotate(0deg);
    }
    20%  {
      top: 33%;
      transform:rotate(-135deg);
    }
    30%  {
      top: 33%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    40%  {
      top: 33%;
      transform:rotate(-135deg);
      margin-left: 0%;
    }
    55%  {
      top: 33%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    65%  {
      top: 33%;
      transform:rotate(-135deg);
      margin-left: 0%;
    }
    80%  {
      top: 33%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    100% {
      top: 20%;
      transform:rotate(-225deg);
    }
  }
</style>
