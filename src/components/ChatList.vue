<template>
    <div id="container">
        <div id="chat">
            <div v-for="(message,index) in messages" :key="message.key">
                <div class="messagebox left-box" v-if="!message.self">
                    <div class="avatarbox left-avatar">
                        <img :src="message.avatar" class="avatar absolute-center">
                    </div>
                    <div class="messagebody left-body">
                        <p class="left-name">{{message.name}}</p>
                        <div class="bubble">{{message.body}}</div>
                        <span class="left-time">{{message.time}}</span>
                        <span class="reply-button" @click="setReplyTo(index)">回复</span>
                    </div>
                </div>
                <div class="messagebox right-box" v-else>
                    <div class="messagebody right-body">
                        <p class="right-name">{{message.name}}</p>
                        <div class="bubble">{{message.body}}</div>
                        <p class="right-time">{{message.time}}</p>
                    </div>
                    <div class="avatarbox right-avatar">
                        <img :src="message.avatar" class="avatar absolute-center">
                    </div>
                </div>
            </div>
        </div>
        <div id="input">
            <div id="reply-to" v-if="replyTo">
                <div @click="cancelReplyTo">X</div>
                <div>正在回复{{replyTo}}</div>
            </div>
            <p>{{text}}</p>
            <textarea v-model="text"></textarea>
            <div id="button" @click="addMessage"><p>发送</p></p></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'QuestionList',
    data () {
        return {
            selfYibanId: localStorage.yb_id,
            selfAvatar: localStorage.head_img,
            selfName: localStorage.teacher_name,
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
    mounted () {
        this.getMessages()
    },
    methods: {
        sortByTime(a, b) {
            // console.log(a,b, new Date(a.add_time))
            return new Date(a.time) - new Date(b.time)
        },
        getMessages() {
            axios.all([
                    axios.get('http://yb.upc.edu.cn:8086/problem/'),
                    axios.get('http://yb.upc.edu.cn:8086/answer_teacher/'),
                    axios.get('http://yb.upc.edu.cn:8086/secret_teacher/', { params: { teacher_id: this.selfYibanId}})
                ]).then(axios.spread((r1, r2, r3) => {
                    // console.log(r1,[r2.data], [r3.data])
                    r1.data.map(v => {
                        return {
                            self: false,
                            name: v.student_name,
                            avatar: v.head_img,
                            time: v.add_time,
                            body: v.problem
                        }
                    }).forEach(v => this.messages.push(v))
                    r2.data.map(v => {
                        return {
                            self: true,
                            name: v.teacher_name,
                            avatar: v.head_img,
                            time: v.add_time,
                            body: v.answer
                        }
                    }).forEach(v => this.messages.push(v))
                    r3.data.map(v => {
                        return {
                            self: true,
                            name: v.teacher_name,
                            avatar: v.teacher_head_url,
                            time: v.add_time,
                            body: `@${v.student_name} ${v.secret_answer}`
                        }
                    }).forEach(v => this.messages.push(v))
                    this.messages.sort(this.sortByTime)
                    console.log(this.messages)
                    this.messages.forEach(v => {
                        let time = new Date(v.time)
                        v.time = `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日 ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`
                    })
                    setTimeout(function() {
                        window.scrollTo({
                            top: document.getElementById('chat').scrollHeight
                        })
                    }, 20)
                }))
        },
        addMessage() {
            let time = new Date()
            let promise
            if (this.replyTo) {
                promise = axios.post('http://yb.upc.edu.cn:8086/secret/', {
                    teacher_yb_id: this.selfYibanId,
                    teacher_head_url: this.selfAvatar,
                    teacher_name: this.selfName,
                    student_name: this.replyTo,
                    student_head_url: this.replyHeadImage,
                    secret_answer: this.text
                })
                console.log({
                    teacher_yb_id: localStorage.yb_id,
                    teacher_head_url: this.selfAvatar,
                    teacher_name: this.selfName,
                    student_name: this.replyTo,
                    student_head_url: this.replyHeadImage,
                    secret_answer: this.text
                })
            } else {
                promise = axios.post('http://yb.upc.edu.cn:8086/answer/', {
                    'teacher_name': this.selfName,
                    'head_img': this.selfAvatar,
                    'answer': this.text
                })
            }
            promise.then(r => {
                this.messages.push({
                    self: true,
                    name: this.selfName,
                    avatar: this.selfAvatar,
                    time: `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}`,
                    body: this.replyTo ? `@${this.replyTo} ${this.text}` : this.text
                })
                this.text = ''
                this.cancelReplyTo()
                // setTimeout(function() {
                //     window.scrollTo({
                //         top: document.getElementById('chat').scrollHeight,
                //         behavior: 'smooth'
                //     })
                // }, 50)
            })
        },
    }
}
</script>


<style scoped>
p {
    margin: 0;
}
#background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
#chat {
    width: 100%;
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