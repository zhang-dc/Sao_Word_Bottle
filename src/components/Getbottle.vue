<template>
  <div class="index-container">
    <div class="sky-container"></div>
    <div class="beach-container">
      <div>
        <button @click="diu">
          <img src="../assets/images/扔一个.png">
        </button>
        <button @click="lao">
          <img src="../assets/images/捞捞看.png">
        </button>
      </div>
    </div>
    <div class="net-container">
      <div class="net" :class="getbottle">
        <img src="../assets/images/网兜.png" v-show="wangdou">
        <div class="bottle" v-show="isgetbottle">
          <img src="../assets/images/漂流瓶.png">
        </div>
      </div>
    </div>
    <div class="alert-container write-container" v-show="iswrite">
      <span class="closewrite" @click="relao">
        <img src="../assets/images/x.png" alt="">
      </span>
      <div class="alert-frame  write-frame">
        <textarea type="text" placeholder="未填写" v-model="writeInfo"></textarea>
        <button class="relao alert-button" @click="throwbottle">扔到海里</button>
      </div>
    </div>
    <div class="alert-container" v-show="isalert">
      <div class="alert-frame">
        {{alertInfo}}
        <br>
        <button @click="relao" class="relao alert-button">再捞一次</button>
      </div>
    </div>
    <div class="overmain" v-show="isalert" @click="relao"></div>
    <img src="../assets/images/漂流瓶.png" v-show="bottleThrow" :class="bottleimg" class="bottleimg">
  </div>
</template>

<script>
import Store from "@/util/Store";
export default {
  name: "getbottle",
  data() {
    return {
      userName: '',
      getbottle: "",
      laoable: true,
      bottleInfo: null,
      isgetbottle: false,
      isalert: false,
      iswrite:false,
      alertInfo: "没有捞到噢，试试:",
      writeInfo: '',
      bottleThrow: false,
      bottleimg: '',
      wangdou: true
    };
  },
  created() {
    this.userName = sessionStorage.getItem('userName')
    Store.connectSocket(this.userName)
    Store.onBottleListChange = () => {
      this.bottleInfo = Store.bottleList
      console.log(Store.bottleList)
      if (this.bottleInfo && this.getbottle == 'getbottle') {
        setTimeout(() => {
          this.isgetbottle = true
        }, 3000)
        this.alertInfo = "捞到了!"
      }
    }
  },
  methods: {
    diu() {
      this.iswrite = true
      this.iswrite = true
      this.wangdou = false
    },
    throwbottle() {
      Store.throwBottle(this.writeInfo);
      this.isalert = false
      this.iswrite = false
      this.bottleThrow = true
      this.bottleimg = 'throw'
      setTimeout(()=>{
        this.writeInfo = ''
      }, 100)
      setTimeout(()=>{
        this.bottleThrow = false
        this.wangdou = true
        this.bottleimg = ''
        alert('您的瓶子已随着海水飘向远方')
      }, 3000)
    },
    lao() {
      this.getbottle = 'getbottle'
      Store.getBottle()
      setTimeout(()=>{
        this.isalert = true
      }, 4500)
    },
    relao() {
      this.getbottle = ''
      this.alertInfo = "没有捞到噢，试试:"
      this.isgetbottle = false
      this.isalert = false
      this.iswrite = false
      this.wangdou = true
    },
    notget() {
      this.relao()
      //此处写将瓶子扔回海里
    }
  }
};
</script>

<style scoped>
@font-face{
  font-family: 'Lemiao';
  src: url('../assets/fonts/HYLeMiaoTiW.ttf') format('truetype');
}
.index-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.sky-container,
.beach-container {
  position: relative;
  top: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}
.sky-container {
  height: 47%;
  z-index: -1;
  background-image: url("../assets/images/蓝天.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.beach-container {
  height: 53%;
  z-index: 3;
  background-image: url("../assets/images/海滩.jpg");
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
.sky-container img,
.beach-container img {
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
.net-container img {
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
  transform: rotate(-100deg);
  z-index: 3;
}
.bottle img {
  margin-left: 2rem;
  margin-bottom: 3rem;
  height: 100%;
  width: auto;
}
.alert-container {
  position: absolute;
  top: 40%;
  left: 10%;
  z-index: 999;
  width: 80%;
  height: 15rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #efce6e;
  transform: rotate(-3deg);
}
.alert-frame {
  position: absolute;
  width: 90%;
  height: 67%;
  transform: rotate(3deg);
  font-size: 1.8rem;
}
.alert-button {
  background: none;
  outline: none;
  border: none;
  width: 100%;
  height: 3rem;
  font-size: 1.6rem;
  color: brown;
  margin-top: 1rem;
}
.relao {
  position: absolute;
  bottom: 0;
}
.overmain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
  z-index: 4;
}
.write-container {
  position: absolute;
  width: 90%;
  left: 5%;
  z-index: 998;
}
.write-frame {
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.write-frame textarea {
  width: 90%;
  background: none;
  outline: none;
  border: none;
  border-bottom: brown 1px solid;
  font-size: 1.6rem;
  font-family: 'Lemiao';
  margin-top: 1rem;
  height: 70%;
  overflow: scroll;
}
.closewrite {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  font-size: 2rem;
  height: 3rem;
  width: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bottleimg {
  position: absolute;
  bottom: 0;
  z-index: 998;
  width: 20%;
  margin-left: 40%;
  margin-bottom: 30%;
}
.throw {
  animation: throw 2s linear;
  animation-fill-mode: forwards;
}
@keyframes getBottle {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  20% {
    top: 50%;
    transform: rotate(-135deg);
  }
  30% {
    top: 50%;
    transform: rotate(-135deg);
    margin-left: 15%;
  }
  40% {
    top: 50%;
    transform: rotate(-135deg);
    margin-left: 0%;
  }
  55% {
    top: 50%;
    transform: rotate(-135deg);
    margin-left: 15%;
  }
  65% {
    top: 50%;
    transform: rotate(-135deg);
    margin-left: 0%;
  }
  80% {
    top: 50%;
    transform: rotate(-135deg);
    margin-left: 15%;
  }
  100% {
    top: 0%;
    transform: rotate(-225deg);
  }
}
@keyframes throw {
  0% {
    margin-left: 40%;
    margin-bottom: 30%;
    transform: rotate(0deg);
    width: 20%;
  }
  50% {
    margin-left: 50%;
    margin-bottom: 130%;
    transform: rotate(-360deg);
    width: 10%;
  }
  100% {
    margin-left: 60%;
    margin-bottom: 90%;
    transform: rotate(-720deg);
    width: 0%;
  }
}
</style>
