<template>
  <div class="index-container">
    <div class="sky-container">
    </div>
    <div class="beach-container">
      <div>
        <button @click="diu">丢一个</button>
        <button @click="lao" v-show="beforelao">捞一捞</button>
        <button @click="relao" v-show="!laoable">再捞一次</button>
      </div>
    </div>
    <div class="net-container">
      <div class="net" :class="getbottle">

      </div>
    </div>
    <div>sasd</div>
  </div>
</template>

<script>
import Store from '@/util/Store'
export default {
  name: 'getbottle',
  methods: {
    diu () {
      Store.throwBottle('ggg')
    },
    lao () {
      this.getbottle = ''
      this.getbottle = 'getbottle'
      this.beforelao = false
      Store.getBottle()
    },
    relao () {
      this.getbottle = ''
    }
  },
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
  }
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
    z-index: 1;
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
    width: 7.2rem;
    height: 9.1rem;
    position: relative;
    z-index: 2;
    background-image: url('../assets/images/网兜.png');
    background-size: contain;
    background-repeat: no-repeat;
    top: 20%;
  }

  .net-container img{
    width: 30%;
    margin-left: 35%;
  }

  .getbottle {
    animation: getBottle 4s linear;
    animation-fill-mode: forwards;
  }

  @keyframes getBottle
  {
    0%   {
      top: 0%;
      transform:rotate(0deg);
    }
    20%  {
      top: 43%;
      transform:rotate(-135deg);
    }
    30%  {
      top: 43%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    40%  {
      top: 43%;
      transform:rotate(-135deg);
      margin-left: 0%;
    }
    55%  {
      top: 43%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    65%  {
      top: 43%;
      transform:rotate(-135deg);
      margin-left: 0%;
    }
    80%  {
      top: 43%;
      transform:rotate(-135deg);
      margin-left: 15%;
    }
    100% {
      top: 0%;
      transform:rotate(-225deg);
    }
  }
</style>
