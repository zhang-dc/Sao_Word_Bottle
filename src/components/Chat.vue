<template>
    <div id="container">
        <div id="background"></div>
        <div id="chat">
            <div v-for="(message,index) in messages">
                <div class="messagebox left-box" v-if="message.from != selfName">
                    <div class="messagebody left-body">
                        <p class="left-name">{{message.name}}</p>
                        <div class="bubble">{{message.content}}</div>
                    </div>
                </div>
                <div class="messagebox right-box" v-else>
                    <div class="messagebody right-body">
                        <p class="right-name">{{message.name}}</p>
                        <div class="bubble">{{message.body}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="input">
            <textarea v-model="text"></textarea>
            <div id="button" @click="addMessage"><p>发送</p></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Store from "@/util/Store";
export default {
    name: 'QuestionList',
    data () {
        return {
            selfName: '',
            text: '',
            messages: [
                // {
                //     self: false,
                //     name: '鱼',
                //     avatar: require('@/assets/8.jpg'),
                //     time: '2018年10月11日 8:23',
                //     body: '一场大规模的恐怖袭击，一个牵扯无数内幕的神秘组织，这个关乎整个东京的可怕计划即将拉开帷幕…首脑云集的东京峰会举办在即，会场突然发生超大规模的爆炸事件，不仅在现场发现行踪诡异的安室透，毛利小五郎更是惨遭陷害。面对最危险任务，最烧脑的推理，最艰难的博弈，柯南能否在迷雾中寻找到唯一的真相。'
                // }
            ],
            replyTo: false,
            replyHeadImage: ''
        }
    },
    created () {
        this.selfName = sessionStorage.getItem('username')
        let str = sessionStorage.getItem('messages')
        this.messages = JSON.parse(str)
        console.log(this.messages)
        Store.onBottleListChange = () => {
          console.log(1)
        }
    },
    mounted () {

    },
    methods: {
        addMessage() {
            let to = ''
            //Store.sendMessage(to, content, uuid)
        },
        
    }
}
</script>


<style scoped>
p {
    margin: 0;
}
#container {
    width: 100%;
    height: 100%;
}
#background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: #DDDDDD;
}
#chat {
    width: 100%;
    height: 93%;
    margin-bottom: 4rem;
    overflow: scroll;
}
.avatarbox {
    /* display: inline-block; */
    position: relative;
    min-width: 3.5rem;
    max-width: 3.5rem;
    height: 3.5rem;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
}
.left-avatar {
    left: 1rem;
}
.right-avatar {
    right: 1rem;
}
.avatar {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}
.right-name,.left-name,.left-time,.right-time,.reply-button {
    color: #ffffff;
}
.reply-button {
    margin-left: 1rem;
}
.right-name,.left-name {
    margin-bottom: 0.5rem;
}
.right-name,.right-time {
    text-align: right; 
}
.messagebody {
    max-width: 72%;
}
.left-body {
    margin: 0 1rem 0 2rem;
}
.right-body {
    margin: 0 2rem 0 1rem;
}
.messagebox {
    display: flex;
    margin-top: 1rem;
}
.right-box {
    justify-content: flex-end;
}
.bubble {
    background: #ffffff;
    border-radius: 0.5rem;
    padding: 0.5rem;
    word-wrap: break-word;
}
#input {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 7%;
    min-height: 3rem;
    max-height: 12rem;
    display: flex;
}
#reply-to {
    position: absolute;
    display: flex;
    width: 100%;
    height: 2rem;
    background: #ffffff;
    border-bottom: 1px solid #404040;
    transform: translateY(-100%);
}
#reply-to > div {
    margin: auto 0.5rem;
    /* font-size: 1.1rem; */
}
#input>textarea {
    font-size: 1rem;
    font-family: Arial, "Times New Roman", 
             "Microsoft YaHei", "微软雅黑", 
             STXihei, "华文细黑", 
             serif;
    min-height: 1rem;
    height: 80%;
    max-height: 11rem;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    width: 72%;
    border: none;
    border-bottom: #969390 1px solid;
    word-wrap: break-word;
}
#input>p{
    display: block;
    width: 72%;
    font-size: 1rem;
    font-family: Arial, "Times New Roman", 
             "Microsoft YaHei", "微软雅黑", 
             STXihei, "华文细黑", 
             serif;
    word-wrap: break-word;
    /* transform: translateY(-100%); */
    visibility: hidden;
}
#button {
    height: 2rem;
    width: 4rem;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    border: #404040 1px solid;
    border-radius: 1rem;
}
#button>p {
    text-align: center;
    line-height: 2rem;
}
</style>