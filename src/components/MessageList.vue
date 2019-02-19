<template>
  <div class="index-container">
    <div class="header-container">
      <img src="../assets/images/头部.jpg">
    </div>
    <div class="body-container">
      <div class="message-container" v-for="item in chatList" :key="item.key" @click="toChat(item.chatnames)">
        <div class="title">
          {{item.chatnames}}
        </div>
        <div class="last-message">
          {{item.chatinfos}}
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
      userName: '',
      bottleList: null,
      chatList: [{}],
      messages: []
    }
  },
  created () {
    document.title = '消息列表'
    this.userName = sessionStorage.getItem('userName')
    Store.connectSocket(this.userName)
    Store.onBottleListChange = () => {
      setTimeout(()=>{
        console.log(Store.bottleList)
        this.bottleList = Store.bottleList.reverse()
        var namekey = 1
        this.chatList[0] = {}
        if (this.bottleList[0].from != this.userName) {
          this.chatList[0].chatnames = this.bottleList[0].from
          this.chatList[0].chatinfos = this.bottleList[0].content
        } else if (this.bottleList[0].to != this.userName) {
          this.chatList[0].chatnames = this.bottleList[0].to
          this.chatList[0].chatinfos = this.bottleList[0].content
        }
        Object.keys(this.bottleList).forEach(key => {
          let flag = 1
          let bottleName = ''
          if (this.bottleList[key].from != this.userName) {
            bottleName = this.bottleList[key].from
          } else if (this.bottleList[key].to != this.userName) {
            bottleName = this.bottleList[key].to
          }
          for (let i = 0;i < namekey;i++) {
            if (this.chatList[i].chatnames == bottleName) {
              flag = 0
              break
            }
            if (i == namekey-1 && flag == 1 && bottleName != '') {
              let data = {
                chatnames: bottleName,
                chatinfos: this.bottleList[key].content
              }
              this.$set(this.chatList, namekey, data);
              namekey ++
              console.log(this.chatList)
            }
          }
        })
      },100)
    }
  },
  mounted () {
    setTimeout(()=>{
      Store.getBottleList()
    },1000)
  },
  methods: {
    toChat (name) {
      let chatnum = 0
      Object.keys(this.bottleList).forEach(key => {
        if (this.bottleList[key].to == name || this.bottleList[key].from == name) {
          this.messages[chatnum] = this.bottleList[key]
          chatnum ++
        }
      })
      setTimeout(()=> {
        let str = JSON.stringify(this.messages)
        sessionStorage.setItem('messages', str)
        this.$router.push('/chat')
      },100)
    }
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
