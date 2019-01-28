<template>
  <div class="index-container">
    <div class="sky-container">
    </div>
    <div class="beach-container">
      <div>
        <button @click="diu"><img src="../assets/images/扔一个.png"></button>
        <button @click="lao" v-show="beforelao"><img src="../assets/images/捞捞看.png"></button>
      </div>
    </div>
    <div class="net-container">
      <div class="net" :class="getbottle">
        <img src="../assets/images/网兜.png">
        <div class="bottle" v-show="!beforelao">
          <img src="../assets/images/漂流瓶.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '@/util/Store'
export default {
  name: 'getbottle',
  data () {
    return {
      getbottle: '',
      beforelao: true,
      laoable: true
    }
  },
  created() {
    Store.connectSocket('test')
    Store.onBottleListChange = () => {
      console.log(Store.bottleList)
    }
  },
  methods: {
    diu () {
      Store.throwBottle('ggg')
    },
    lao () {
      setTimeout(()=>{
        this.getbottle = 'getbottle'
      },10);
      setTimeout(()=>{
        this.beforelao = false
      },1000);
      //this.getbottle = ''
      //this.getbottle = 'getbottle'
      //
      //Store.getBottle()
    },
    relao () {
      this.getbottle = ''
    }
  },
}
</script>

<style scoped>
  .index-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  .sky-container, .beach-container {
    position: relative;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .sky-container {
    height: 47%;
    z-index: -1;
    background-image: url('../assets/images/蓝天.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .beach-container {
    height: 53%;
    z-index: 3;
    background-image: url('../assets/images/海滩.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .beach-container div {
    position: absolute;
    bottom: 5rem;
    height: 2.8rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .beach-container button {
    background: none;
    border: none;
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
  .sky-container img, .beach-container img {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .net-container {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 8%;
  }
  .net {
    width: 6rem;
    height: 10rem;
    position: relative;
    top: 20%;
  }
  .net-container img{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 4;
  }
  .getbottle {
    animation: getBottle 4s linear;
    animation-fill-mode: forwards;
  }
  .bottle {
    height: 70%;
    width: 100%;
    display: flex;
    position: absolute;
    top: 0%;
    right: 0%;
    transform:rotate(-100deg);
    z-index: 3;
  }
  .bottle img {
    margin-left: 2rem;
    margin-bottom: 3rem;
    height: 100%;
    width: auto;
  }
  @keyframes getBottle
  {
    0%   {
      top: 0%;
      transform:rotate(0deg);
    }
    20%  {
      top: 50%;
      transform:rotate(-135deg);
    }
    30%  {
      top: 50%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    40%  {
      top: 50%;
      transform:rotate(-135deg);
      margin-left: 0%;
    }
    55%  {
      top: 50%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    65%  {
      top: 50%;
      transform:rotate(-135deg);
      margin-left: 0%;
    }
    80%  {
      top: 50%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    100% {
      top: 0%;
      transform:rotate(-225deg);
    }
  }
</style>
